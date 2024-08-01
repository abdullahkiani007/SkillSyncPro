<div className="flex flex-wrap justify-center">
  {jobPosts.map((post) => (
    <div key={post.id} className="m-4 w-full sm:w-1/2 lg:w-1/3">
      <Card className="shadow-2xl">
        <CardContent className="flex flex-col">
          <div className="flex items-center justify-between">
            <img
              src={post.logo}
              alt={`${post.company} logo`}
              className="w-16 h-16 rounded-full"
            />
            <FaRegBookmark className="text-2xl" />
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-xl">{post.title}</h2>
            <p className="text-gray-500">{post.company}</p>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
          <div className="flex flex-wrap mt-4">
            <span className="text-sm text-gray-700 mr-2">{post.type}</span>
            <span className="text-sm text-gray-700 mr-2">{post.level}</span>
            <span className="text-sm text-gray-700">{post.location}</span>
          </div>
          <div className="flex items-center mt-4">
            <HiOutlineCurrencyDollar className="text-xl" />
            <p className="text-sm text-gray-500 ml-2">{post.salary}</p>
          </div>
          <Button variant="contained" className="mt-4 bg-blue-500 text-white">
            Details
          </Button>
        </CardContent>
      </Card>
    </div>
  ))}
</div>;
