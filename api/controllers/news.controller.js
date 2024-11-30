import News from "../models/news.model.js";


export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json({ news });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id); 
    if (!newsItem) {
      return res.status(404).json({ message: "News item not found." });
    }
    res.json(newsItem);
  } catch (error) {
    console.error("Error fetching news item:", error);
    res.status(500).json({ message: "Error fetching news item." });
  }
};
