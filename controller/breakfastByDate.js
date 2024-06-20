import Breakfast from '../models/Breakfast'; // Adjust the path as needed

// Controller function for fetching breakfast data by date
const breakfastByDate = async (req, res) => {
  const { date } = req.body;

  try {
    // Find breakfast entries for the given date
    const breakfasts = await Breakfast.find({ date });

    if (breakfasts.length === 0) {
      return res.status(404).json({ msg: 'No breakfast data found for the specified date' });
    }

    res.json(breakfasts);
  } catch (err) {
    console.error('Error fetching breakfast data:', err.message);
    res.status(500).send('Server Error');
  }
};

export { breakfastByDate };