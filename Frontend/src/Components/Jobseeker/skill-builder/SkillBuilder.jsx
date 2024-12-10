import React, { useState } from 'react'

export const SkillBuilder = () => {
  const [activeTab, setActiveTab] = useState('articles')

  const articles = [
    {
      title: 'Top Machine Learning Algorithms You Must Know',
      url: 'https://www.analyticsvidhya.com',
    },
    {
      title: 'Machine Learning Basics - Coursera Article',
      url: 'https://www.coursera.org/learn/machine-learning/home/welcome',
    },
    {
      title: '15 Machine Learning Projects for Beginners',
      url: 'https://www.kdnuggets.com/2023/11/15-machine-learning-projects-beginners.html',
    },
    {
      title: 'Introduction to Artificial Intelligence',
      url: 'https://ai.google/education/',
    },
    {
      title: "Beginner's Guide to Web Development",
      url: 'https://www.freecodecamp.org/news/learn-web-development-as-a-beginner/',
    },
    {
      title: 'Understanding Blockchain Technology',
      url: 'https://www.ibm.com/topics/what-is-blockchain',
    },
    {
      title: 'Cloud Computing Basics',
      url: 'https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-cloud-computing/',
    },
    {
      title: 'Cybersecurity Essentials',
      url: 'https://www.coursera.org/articles/what-is-cyber-security',
    },
  ]

  const videos = [
    {
      title: 'Machine Learning Full Course - Edureka',
      url: 'https://www.youtube.com/embed/Gv9_4yMHFhI',
    },

    {
      title: 'Neural Networks for Beginners - 3Blue1Brown',
      url: 'https://www.youtube.com/embed/aircAruvnKk',
    },
    {
      title: 'Introduction to Blockchain - Simplilearn',
      url: 'https://www.youtube.com/embed/SSo_EIwHSd4',
    },
    {
      title: 'Web Development Full Course - FreeCodeCamp',
      url: 'https://www.youtube.com/embed/mU6anWqZJcc',
    },

    {
      title: 'How Artificial Intelligence is Changing the World - TEDx',
      url: 'https://www.youtube.com/embed/2ePf9rue1Ao',
    },
  ]

  const backgroundImages = [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  ]

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        paddingBottom: '50px',
      }}
    >
      {/* Header Section */}
      <header
        style={{
          backgroundColor: '#002B5B',
          color: '#fff',
          padding: '40px 20px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '0 0 20px 20px',
        }}
      >
        <h1 style={{ fontSize: '3rem', margin: '0', fontWeight: 'bold' }}>
          Explore Technology Resources
        </h1>
        <p style={{ fontSize: '1.3rem', marginTop: '15px', lineHeight: '1.6' }}>
          Dive into curated articles and videos to boost your knowledge in
          Machine Learning, Web Development, Blockchain, Cybersecurity, and
          more.
        </p>
      </header>

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginTop: '20px',
          padding: '0 20px',
        }}
      >
        <button
          style={{
            padding: '12px 30px',
            backgroundColor: activeTab === 'articles' ? '#3498db' : '#ecf0f1',
            color: activeTab === 'articles' ? '#fff' : '#2c3e50',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
          }}
          onClick={() => setActiveTab('articles')}
        >
          Articles
        </button>
        <button
          style={{
            padding: '12px 30px',
            backgroundColor: activeTab === 'videos' ? '#3498db' : '#ecf0f1',
            color: activeTab === 'videos' ? '#fff' : '#2c3e50',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
          }}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </button>
      </div>

      {/* Content Section */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
        {activeTab === 'articles' && (
          <>
            <h2
              style={{
                color: '#34495e',
                textAlign: 'center',
                marginBottom: '20px',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              Featured Articles
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '40px',
                marginTop: '20px',
              }}
            >
              {articles.map((article, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${backgroundImages[index]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '30px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                    overflow: 'hidden',
                    color: '#fff',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.05)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  <h3
                    style={{
                      marginBottom: '10px',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      padding: '10px 15px',
                      borderRadius: '5px',
                    }}
                  >
                    {article.title}
                  </h3>
                  <a
                    href={article.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                      color: '#3498db',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'block',
                      marginTop: '20px',
                      fontSize: '1.2rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      textAlign: 'center',
                    }}
                  >
                    Read More ↗
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'videos' && (
          <>
            <h2
              style={{
                color: '#34495e',
                textAlign: 'center',
                marginBottom: '20px',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              Featured Videos
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '40px',
                marginTop: '20px',
              }}
            >
              {videos.map((video, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '40px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.05)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  <h3
                    style={{
                      color: '#2c3e50',
                      marginBottom: '20px',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {video.title}
                  </h3>
                  <iframe
                    width='100%'
                    height='250'
                    src={video.url}
                    title={video.title}
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    style={{ borderRadius: '8px' }}
                  ></iframe>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
