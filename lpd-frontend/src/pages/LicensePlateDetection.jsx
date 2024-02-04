import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import Alert from '../components/Alert';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LicensePlateDetection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const location = useLocation();
  const param = location.state;
  console.log(param);

  const fetchData = async () => {
    try {
      const url = "http://127.0.0.1:5000/login?username="+param.username;
      const method = "GET";
      const content = "application/json";
      const result = await getResponse(url,null,method,content);
      // console.log("Data:", result);
      setData(result);
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    fetchData(); // Fetch data before rendering
    return <div>Loading...</div>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const url = "http://127.0.0.1:5000/upload";
      const method = "POST";
      const formData = new FormData();
      formData.append('image', selectedFile);
      // const content = 'multipart/form-data';
      const result = await getResponse(url,formData,method,null);
      console.log(result);
    }
    catch (error) {
        console.error('Error uploading image:', error);
      }
  };


  return data.status === "success" ? (<>
    <Header />
    <div className='flex flex-col justify-center items-center h-screen'>
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="photoInput" className="block text-sm font-medium text-gray-700">
          Upload Photo
        </label>
        <input
          type='file'
          name='image'
          required
          id='photoInput'
          accept='image/*'
          onChange={handleFileChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Preview:</p>
            <img src={previewUrl} alt="Preview" className="mt-2 max-w-full h-32 rounded-md" />
          </div>
        )}
        <button
          encType="multipart/form-data"
          type="submit"
          className="mt-4 p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    <Footer />
    </>) : (
    <>
      <Header />
      <Alert />
      <Footer />
    </>
  );
}


async function getResponse(url,dataurl, method, contentType) {
    try {
        const response = await fetch(url, {
          method: method,
          headers: {
            ...(contentType !== null ? { 'Content-Type': contentType } : {}),
            "Access-Control-Allow-Origin": "http://127.0.0.1:5000/*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "*"
          },
          body:dataurl
        });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Extracting data as a JSON Object from the response

        // Depending on your use case, you might want to return or do something with the data
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error as needed
    }
}





export default LicensePlateDetection