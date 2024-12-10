import React, { useState } from "react";

export const SkillBuilder = () => {
  const [activeTab, setActiveTab] = useState("articles");

  const articles = [
    {
      title: "Top Machine Learning Algorithms You Must Know",
      url: "https://www.analyticsvidhya.com",
    },
    {
      title: "Machine Learning Basics - Coursera Article",
      url: "https://www.coursera.org/learn/machine-learning/home/welcome",
    },
    {
      title: "15 Machine Learning Projects for Beginners",
      url: "https://www.kdnuggets.com/2023/11/15-machine-learning-projects-beginners.html",
    },
  ];

  const videos = [
    {
      title: "Machine Learning Full Course - Edureka",
      url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
    },
    {
      title: "Supervised vs. Unsupervised Learning - Simplilearn",
      url: "https://www.youtube.com/watch?v=AC7C4iFevAw",
    },
    {
      title: "Neural Networks for Beginners - 3Blue1Brown",
      url: "https://www.youtube.com/watch?v=aircAruvnKk",
    },
  ];
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Skill Builder</h1>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "articles" ? "#3498db" : "#ecf0f1",
            color: activeTab === "articles" ? "#fff" : "#2c3e50",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setActiveTab("articles")}
        >
          Articles
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "videos" ? "#3498db" : "#ecf0f1",
            color: activeTab === "videos" ? "#fff" : "#2c3e50",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
      </div>

      {activeTab === "articles" && (
        <div>
          <h2 style={{ color: "#34495e" }}>Recommended Articles</h2>
          <ul>
            {articles.map((article, index) => (
              <li
                key={index}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #bdc3c7",
                  borderRadius: "5px",
                }}
              >
                <h3 style={{ margin: "0", color: "#2c3e50" }}>
                  {article.title}
                </h3>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  {article.description}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3498db" }}
                >
                  Read More
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "videos" && (
        <div>
          <h2 style={{ color: "#34495e" }}>Recommended Videos</h2>
          <ul>
            {videos.map((video, index) => (
              <li
                key={index}
                style={{
                  margin: "20px 0",
                  padding: "10px",
                  border: "1px solid #bdc3c7",
                  borderRadius: "5px",
                }}
              >
                <h3 style={{ margin: "0", color: "#2c3e50" }}>{video.title}</h3>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  {video.description}
                </p>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ marginTop: "10px", borderRadius: "5px" }}
                ></iframe>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
