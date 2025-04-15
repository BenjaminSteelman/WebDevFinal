const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_API_KEY);

exports.handler = async function(event, context) {
  try {
    const { data, error } = await supabase
      .from('CourseList')
      .select('id', 'courseList')
      .order('id', { ascending: false});

    if (error) {
      console.error(error.message);
    };

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
  } catch (error) {
    console.error(error.message);
  }
};
