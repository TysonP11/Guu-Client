import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-18-220-181-201.us-east-2.compute.amazonaws.com:8000/api",
});
