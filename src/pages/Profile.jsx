import { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/index";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const [image, setImage] = useState("https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png");
  const userId = localStorage.getItem("userId");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    
    const unsub = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
            console.log("User data updated:", docSnap.data());
            setImage(docSnap.data().profilePic || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png");
        }
    });

    return () => unsub();
}, [userId]);


  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (!currentUser || !currentUser.uid) {
      console.error("User ID is null, cannot upload image.");
      return;
    }

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "first_time_using_cloudinary");
      data.append("cloud_name", "dr6nve10w");

      const res = await fetch("https://api.cloudinary.com/v1_1/dr6nve10w/image/upload", {
        method: "POST",
        body: data,
      });

      const uploadImgURL = await res.json();

      if (!uploadImgURL.url) {
        console.error("Cloudinary upload failed:", uploadImgURL);
        return;
      }

      console.log("New Image URL:", uploadImgURL.url);

      await updateProfile(auth.currentUser, {
        photoURL: uploadImgURL.url,
      });

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { profilePic: uploadImgURL.url });

      console.log("Firestore updated successfully!");

      setImage(uploadImgURL.url);
    } catch (error) {
      console.log("Error uploading image:", error);
    }
};

  return (
    <>
      <div className="flex flex-col min-h-screen bg-light-blue">
        <div className="flex-grow flex p-6">
          <div className="md:w-1/4 bg-white xs:w-full p-6 rounded-2xl shadow-lg relative">
            <button onClick={() => navigate('/')} className='cursor-pointer absolute top-2 left-2 hover:bg-gray-300 p-2 rounded-full' title='BackMove'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m5.83 9l5.58-5.58L10 2l-8 8l8 8l1.41-1.41L5.83 11H18V9z"></path></svg></button>
            <div className="flex flex-col items-center relative">
              <img
                src={image}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 p-0.5 border-emerald-800 object-cover"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <button
                  className="mt-4 absolute xs:bottom-[60px] xs:left-[150px] md:bottom-[65px] md:left-[85px] lg:bottom-[70px] lg:left-[110px] llg:bottom-[70px] llg:left-[160px] bg-light-blue text-white p-2 rounded-full cursor-pointer"
                  onClick={() => document.getElementById("file-input").click()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 18q2.075 0 3.538-1.462Q17 15.075 17 13q0-2.075-1.462-3.538Q14.075 8 12 8Q9.925 8 8.463 9.462Q7 10.925 7 13q0 2.075 1.463 3.538Q9.925 18 12 18Zm0-2q-1.25 0-2.125-.875T9 13q0-1.25.875-2.125T12 10q1.25 0 2.125.875T15 13q0 1.25-.875 2.125T12 16Zm6-6q.425 0 .712-.288Q19 9.425 19 9t-.288-.713Q18.425 8 18 8t-.712.287Q17 8.575 17 9t.288.712Q17.575 10 18 10ZM4 21q-.825 0-1.412-.587Q2 19.825 2 19V7q0-.825.588-1.412Q3.175 5 4 5h3.15L8.7 3.325q.15-.15.337-.238Q9.225 3 9.425 3h5.15q.2 0 .388.087q.187.088.337.238L16.85 5H20q.825 0 1.413.588Q22 6.175 22 7v12q0 .825-.587 1.413Q20.825 21 20 21Z"></path>
                  </svg>
                </button>
              </label>
              <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <h2 className="mt-4 text-lg font-semibold">{currentUser.displayName}</h2>
              <p className="text-gray-500">Web Developer</p>
            </div>
            <nav className="mt-6">
              <ul className="space-y-4 text-gray-600">
                <li className="cursor-pointer hover:text-gray-900">Profile</li>
                <li className="cursor-pointer hover:text-gray-900">Tasks</li>
                <li className="cursor-pointer hover:text-gray-900">Calendar</li>
                <li className="cursor-pointer hover:text-gray-900">Files</li>
              </ul>
            </nav>
          </div>
          <div className="flex-1 ml-6 p-6 bg-white rounded-2xl shadow-lg hidden md:block">
            <h3 className="text-gray-700 font-semibold">{currentUser.displayName} spends most of their time on...</h3>
            <div className="mt-4 space-y-3">
              {["Product Infrastructure", "Network Security", "Security Testing", "Security Audit Outsourcing", "Bugs"].map(
                (item, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-lg flex items-center">
                    <span className="text-lg mr-2">🔹</span> {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <footer className="bg-[#635BFF] text-white text-center p-4 mt-6 rounded-2xl shadow-lg">
          <p><a>Dhanush mathan </a>&copy;{new Date().getFullYear()} ChatHub. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default ProfileCard;