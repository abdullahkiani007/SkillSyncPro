import React, { useEffect, useState } from 'react'

export const SkillBuilder = () => {
  const [activeTab, setActiveTab] = useState('articles')
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)

  const trendingTopics = [
    {
      text: 'MERN Stack is trending!',
      video: 'https://www.youtube.com/embed/7CqJlxBYj-M',
    },
    {
      text: 'Machine Learning is taking over!',
      video: 'https://www.youtube.com/embed/Gv9_4yMHFhI',
    },
    {
      text: 'Graphic Designing is essential for web development!',
      video: 'https://www.youtube.com/embed/MOeU7xjw_bM',
    },
    {
      text: 'LeetCode is the top choice for interview prep!',
      video: 'https://www.youtube.com/embed/RqQ1d1qEWlE',
    },
  ]

  const articles = [
    {
      title: 'Complete Guide to MERN Stack',
      url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs',
      image: 'https://miro.medium.com/max/700/1*Gkr7mr1S37uDi9AwQzvl8w.png',
    },
    {
      title: 'MEAN Stack Tutorial for Beginners',
      url: 'https://www.tutorialspoint.com/mean_stack/index.htm',
      image: 'https://www.tutorialspoint.com/mean_stack/images/mean_stack.jpg',
    },
    {
      title: 'Machine Learning Basics for Beginners',
      url: 'https://www.coursera.org/learn/machine-learning',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/AI_logo.svg/2048px-AI_logo.svg.png',
    },
    {
      title: 'LeetCode Interview Preparation',
      url: 'https://leetcode.com/problemset/all/',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
    },

    {
      title: 'Learn Node.js with Practical Examples',
      url: 'https://www.digitalocean.com/community/tutorials',
      image:
        'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png',
    },

    {
      title: 'Introduction to RESTful APIs',
      url: 'https://restfulapi.net/',
      image: 'https://restfulapi.net/wp-content/uploads/restful-api.png',
    },
    {
      title: '10 Graphic Design Trends in 2024',
      url: 'https://www.canva.com/learn/graphic-design/',
      image:
        'https://blog.tubikstudio.com/wp-content/uploads/2017/04/graphic-design-process.png',
    },
    {
      title: 'What is Artificial Intelligence?',
      url: 'https://www.ibm.com/cloud/learn/what-is-artificial-intelligence',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/AI_logo.svg/2048px-AI_logo.svg.png',
    },
  ]

  const videos = [
    {
      title: 'MERN Stack Full Course - CodeWithHarry',
      url: 'https://www.youtube.com/embed/7CqJlxBYj-M',
      image: 'https://miro.medium.com/max/700/1*Gkr7mr1S37uDi9AwQzvl8w.png',
    },
    {
      title: 'Machine Learning Full Course',
      url: 'https://www.youtube.com/embed/Gv9_4yMHFhI',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/AI_logo.svg/2048px-AI_logo.svg.png',
    },
    {
      title: 'Web Development Full Course - FreeCodeCamp',
      url: 'https://www.youtube.com/embed/Q33KBiDriJY',
      image:
        'https://codewithharry.com/wp-content/uploads/2021/07/web-development-1.webp',
    },
    {
      title: 'LeetCode Problem Solving Tips',
      url: 'https://www.youtube.com/embed/RqQ1d1qEWlE',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
    },
    {
      title: 'Graphic Design for Beginners',
      url: 'https://www.youtube.com/embed/MOeU7xjw_bM',
      image:
        'https://blog.tubikstudio.com/wp-content/uploads/2017/04/graphic-design-process.png',
    },
    {
      title: 'Learn React.js in One Hour',
      url: 'https://www.youtube.com/embed/Ke90Tje7VS0',
      image: 'https://reactjs.org/logo-og.png',
    },
    {
      title: 'Node.js Crash Course',
      url: 'https://www.youtube.com/embed/fBNz5xF-Kx4',
      image:
        'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png',
    },
    {
      title: 'How to Ace Your Tech Interview',
      url: 'https://www.youtube.com/embed/w1zRyi2lR3Y',
      image: 'https://miro.medium.com/max/1400/1*pflz-QIb90KwVrhG22FCxA.png',
    },
    {
      title: 'Intro to AI and Machine Learning',
      url: 'https://www.youtube.com/embed/JMUxmLyrhSk',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/AI_logo.svg/2048px-AI_logo.svg.png',
    },
    {
      title: 'REST API Crash Course',
      url: 'https://www.youtube.com/embed/lsMQRaeKNDk',
      image: 'https://restfulapi.net/wp-content/uploads/restful-api.png',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopicIndex(
        (prevIndex) => (prevIndex + 1) % trendingTopics.length
      )
    }, 10000) // Change the topic every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const currentTopic = trendingTopics[currentTopicIndex]

  return (
    <div className='bg-gray-100 min-h-screen p-10'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-gray-800'>Skill Builder</h1>
        <p className='text-lg text-gray-600'>
          Learn about the latest tech topics
        </p>
      </div>

      {/* Trending Section */}
      <div className='mb-8 text-center'>
        <div className='p-6 bg-black text-white rounded-lg shadow-lg flex flex-col items-center'>
          <h2 className='text-xl font-bold mb-4'>Trending Topic:</h2>
          <iframe
            src={currentTopic.video}
            title={currentTopic.text}
            className='w-full h-60 rounded-lg mb-4'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
          <p className='text-2xl font-semibold'>{currentTopic.text}</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className='flex justify-center mb-6'>
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-6 py-2 text-lg font-semibold ${
            activeTab === 'articles'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700'
          } rounded-l-lg transition duration-300`}
        >
          Articles
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-6 py-2 text-lg font-semibold ${
            activeTab === 'videos'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700'
          } rounded-r-lg transition duration-300`}
        >
          Videos
        </button>
      </div>

      {/* Content Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {activeTab === 'articles'
          ? articles.map((article, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300'
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className='w-full h-40 object-cover rounded-lg mb-4'
                />
                <h3 className='text-xl font-semibold mb-2'>{article.title}</h3>
                <a
                  href={article.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline'
                >
                  Read more
                </a>
              </div>
            ))
          : videos.map((video, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300'
              >
                <h3 className='text-xl font-semibold mb-2'>{video.title}</h3>
                <iframe
                  src={video.url}
                  title={video.title}
                  className='w-full h-60 rounded-lg'
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            ))}
      </div>
    </div>
  )
}
