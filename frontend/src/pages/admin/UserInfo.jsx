/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import userLogo from "../../assets/user.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;
  const [updateUser, setUpdateUser] = useState(null);

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    try {
      // use formData for text+file
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file);
      }
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update profile");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/user/get-user/${userId}`
      );

      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="pt-5 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
          <div className="flex justify-between gap-10">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h1 className="font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>
          </div>
          <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
            {/* profile picture  */}
            <div className="flex flex-col items-center">
              <img
                src={updateUser?.profilePic || userLogo}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
              />
              <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                Change Picture
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Label>
            </div>
            {/* profile form  */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 shadow-lg p-5 rounded-lg bg-white"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={updateUser?.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={updateUser?.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={updateUser?.email}
                  onChange={handleChange}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  type="text"
                  name="phoneNo"
                  value={updateUser?.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter your Contact number"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium">Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={updateUser?.address}
                  onChange={handleChange}
                  placeholder="Enter your Address"
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium">City</Label>
                  <Input
                    type="text"
                    name="city"
                    value={updateUser?.city}
                    onChange={handleChange}
                    placeholder="Enter your City"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium">Zip Code</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={updateUser?.zipCode}
                    onChange={handleChange}
                    placeholder="Enter your Zip Code"
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Label className={"block text-sm font-medium"}>Role: </Label>
                <RadioGroup
                  value={updateUser?.role}
                  className={"flex items-center"}
                  onValueChange={(value) =>
                    setUpdateUser({ ...updateUser, role: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">User</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg"
              >
                Update Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
