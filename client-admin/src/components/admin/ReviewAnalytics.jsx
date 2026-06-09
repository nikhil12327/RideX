const ReviewAnalytics = ({
    reviews,
  }) => {
  
    const totalReviews =
      reviews.length;
  
    const averageRating =
      totalReviews
        ? (
            reviews.reduce(
              (sum, review) =>
                sum + review.rating,
              0
            ) / totalReviews
          ).toFixed(1)
        : 0;
  
    const ratingCounts = {
  
      5: reviews.filter(
        r => r.rating === 5
      ).length,
  
      4: reviews.filter(
        r => r.rating === 4
      ).length,
  
      3: reviews.filter(
        r => r.rating === 3
      ).length,
  
      2: reviews.filter(
        r => r.rating === 2
      ).length,
  
      1: reviews.filter(
        r => r.rating === 1
      ).length,
  
    };
  
    return (
  
      <div className="mt-10 bg-zinc-900 p-6 rounded-xl">
  
        <h2 className="text-2xl font-bold mb-4">
  
          Reviews Analytics
  
        </h2>
  
        <p>
  
          Average Rating:
          {" "}
          ⭐ {averageRating}
  
        </p>
  
        <p>
  
          Total Reviews:
          {" "}
          {totalReviews}
  
        </p>
  
        <div className="mt-4">
  
          {Object.entries(
            ratingCounts
          )
            .reverse()
            .map(
              ([rating, count]) => (
  
                <p key={rating}>
  
                  {rating}⭐ :
                  {" "}
                  {count}
  
                </p>
  
              )
            )}
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default ReviewAnalytics;  