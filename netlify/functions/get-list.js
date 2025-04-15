var DATABASE_URL =
var SUPABASE_SERVICE_API_KEY = 

require('dotenv').config();
const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

exports.handler = async function(event, context) => {
  try {
    const { data, error } = await supabase
      .from('CourseList');
      .select('id, courseList');
      .order('id', { ascending: false});

    if (error) {
      console.error(error.message);
    };
  };
};
