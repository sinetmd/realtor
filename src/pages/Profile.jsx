import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // update the display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      // update the name in firestore
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, { name });

      toast.success("Profile details updated successfully!");
    } catch (error) {
      toast.error("Could not update profile details");
    }
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form onSubmit={onSubmit}>
            {/* name */}
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetails}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out 
              ${changeDetails && "bg-red-200 focus:bg-red-200"}
              `}
            />
            {/* email */}
            <input
              type="email"
              id="email"
              value={email}
              disabled={!changeDetails}
              className="mb-6 w-full px-4 py-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetails && onSubmit();
                    setChangeDetails((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1 cursor-pointer"
                >
                  {changeDetails ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
