var DATABASE_URL = 'https://xcoelbuelwoyrirwptud.supabase.co';
var SUPABASE_SERVICE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhjb2VsYnVlbHdveXJpcndwdHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDU5MzcsImV4cCI6MjA1OTg4MTkzN30.RGlbvdU4jcchXV-gJQtEuhMuNP6tVqpET7nwqm5DO4A';

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
