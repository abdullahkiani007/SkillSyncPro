import React from "react";
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
  const staticSummaryData = [
    {
      _id: "Applied",
      count: 45,
      color: "#821131",
      Icon: DescriptionIcon,
    },
    {
      _id: "Under Review",
      count: 30,
      color: "#399918",
      Icon: SearchIcon,
    },
    {
      _id: "Interview Scheduled",
      count: 15,
      color: "#0D7C66",
      Icon: EventAvailableIcon,
    },
    {
      _id: "Rejected",
      count: 10,
      color: "#021526",
      Icon: CancelIcon,
    },
  ];

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
          {staticSummaryData.map((item) => (
            <SwiperSlide
              key={item._id}
              className="flex items-center  justify-center rounded-lg text-white font-bold text-2xl"
            >
              <ApplicationSummaryCard
                title={item._id}
                count={item.count}
                color={item.color}
                Icon={item.Icon}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Static Cards for larger devices */}
      <div className="hidden md:flex flex-wrap justify-center gap-4  ">
        {staticSummaryData.map((item) => (
          <ApplicationSummaryCard
            key={item._id}
            title={item._id}
            count={item.count}
            color={item.color}
            Icon={item.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationSummary;
