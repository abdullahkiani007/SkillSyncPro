import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardHeader } from "@mui/material";
import {
  Description as DescriptionIcon,
  Search as SearchIcon,
  EventAvailable as EventAvailableIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import EmployerController from "../../../../API/employer";
import Loader from "../../../../Components/Loader/Loader";

// ApplicationSummaryCard Component
const ApplicationSummaryCard = ({ title, count, color, Icon }) => (
  <Card
    sx={{
      width: 250,
      height: 200,
      backgroundColor: `${color}`,
      color: "white",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: 6,
      },
      transition: "transform 0.3s, box-shadow 0.3s",
    }}
  >
    <CardHeader
      title={<Icon sx={{ fontSize: 50, color: "white" }} />}
      sx={{
        bgcolor: `${color}`,
        textAlign: "center",
        py: 1,
      }}
    />
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="h4" component="div" mt={2}>
        {count}
      </Typography>
    </CardContent>
  </Card>
);

// ApplicationSummary Component
const ApplicationSummary = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await EmployerController.getApplicationsGroupedByStatus(accessToken);
      const data = response.data;

      if (response.status === 200) {
        const summaryDataArr = Object.entries(data).map(([key, value]) => {
          let color = "";
          let Icon = DescriptionIcon; // Default icon

          switch (key) {
            case "Applied":
              color = "#821131";
              Icon = DescriptionIcon;
              break;
            case "Under Review":
              color = "#399918";
              Icon = SearchIcon;
              break;
            case "Interview Scheduled":
              color = "#0D7C66";
              Icon = EventAvailableIcon;
              break;
            case "Rejected":
              color = "#021526";
              Icon = CancelIcon;
              break;
            default:
              color = "#000000"; // Default color
              break;
          }
          return {
            _id: key,
            count: value,
            color,
            Icon,
          };
        });

        setSummaryData(summaryDataArr);
        console.log("Application", summaryDataArr);
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className=" ">
      {/* Carousel for smaller devices */}
      <div className="md:hidden w-80 bg-white ">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className=""
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          style={{ height: "auto" }}
        >
          {summaryData.map((item) => {
            let Icon;
            switch (item._id) {
              case "Applied":
                Icon = DescriptionIcon;
                break;
              case "Under Review":
                Icon = SearchIcon;
                break;
              case "Interview Scheduled":
                Icon = EventAvailableIcon;
                break;
              case "Rejected":
                Icon = CancelIcon;
                break;
              default:
                Icon = DescriptionIcon;
                break;
            }
            return (
              <SwiperSlide
                key={item._id}
                className="flex items-center justify-center rounded-lg text-white font-bold text-2xl"
              >
                <ApplicationSummaryCard
                  title={item._id}
                  count={item.count}
                  color={item.color}
                  Icon={Icon}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Static Cards for larger devices */}
      <div className="hidden md:flex flex-wrap justify-center gap-4">
        {summaryData.map((item) => {
          let Icon;
          switch (item._id) {
            case "Applied":
              Icon = DescriptionIcon;
              break;
            case "Under Review":
              Icon = SearchIcon;
              break;
            case "Interview Scheduled":
              Icon = EventAvailableIcon;
              break;
            case "Rejected":
              Icon = CancelIcon;
              break;
            default:
              Icon = DescriptionIcon;
              break;
          }
          return (
            <ApplicationSummaryCard
              key={item._id}
              title={item._id}
              count={item.count}
              color={item.color}
              Icon={Icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationSummary;