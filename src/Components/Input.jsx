import React, { useContext, useState, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid';
import EmojiPicker from 'emoji-picker-react';

const Input = () => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  // const [showPicker, setShowPicker] = useState(false);

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dr6nve10w";
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "first_time_using_cloudinary";

  // const addEmoji = (emoji) => {
  //   setText((prev) => prev + emoji.emoji);
  //   setShowPicker(false);
  // };

  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.secure_url || data.url || null;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async () => {
    if (!data.chatId) return;

    const trimmedText = text.trim();
    let imageUrl = null;

    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
      if (!imageUrl) return;
    }

    if (!trimmedText && !imageUrl) return;

    const message = {
      id: uuid(),
      senderId: currentUser.uid,
      date: Timestamp.now(),
      text: trimmedText || "",
      ...(imageUrl && { image: imageUrl }),
    };

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion(message),
    });

    const lastMessagePreview = trimmedText || (imageUrl ? "Image" : "");
    const chatUpdate = {
      [data.chatId + ".lastMessage"]: {
        text: lastMessagePreview,
        ...(imageUrl && { image: imageUrl }),
      },
      [data.chatId + ".date"]: serverTimestamp(),
    };

    await updateDoc(doc(db, "userChats", currentUser.uid), chatUpdate);
    await updateDoc(doc(db, "userChats", data.user.uid), chatUpdate);

    setText("");
    setImageFile(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='px-1 flex flex-col space-y-2 bg-white py-2 relative'>
      <div className='flex items-center space-x-2'>
        {/* <button className='cursor-pointer' title='emoji' onClick={() => setShowPicker(!showPicker)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12m7.147 3.553a.75.75 0 0 1 1.05-.155c.728.54 1.607.852 2.553.852s1.825-.313 2.553-.852a.75.75 0 1 1 .894 1.204A5.77 5.77 0 0 1 12 17.75a5.77 5.77 0 0 1-3.447-1.148a.75.75 0 0 1-.156-1.049" clipRule="evenodd"></path><path fill="currentColor" d="M16 10.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5s.448-1.5 1-1.5s1 .672 1 1.5m-6 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S8.448 9 9 9s1 .672 1 1.5"></path></svg>
        </button> */}
        <button className='cursor-pointer' title='attach image' onClick={() => fileInputRef.current?.click()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="15" cy="9" r="2" /><path strokeLinecap="round" d="m20 17.6l-2.223-2a3 3 0 0 0-3.732-.225l-.299.21a2 2 0 0 1-2.564-.222l-4.29-4.29a2.3 2.3 0 0 0-3.14-.104l-1.47 1.286" /><circle cx="12" cy="12" r="10" /></g></svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
      </div>
      {/* {showPicker && (<div className='absolute bottom-20 left-0'><EmojiPicker onEmojiClick={addEmoji} /></div>)} */}
      {imageFile && (
        <div className='relative w-24 h-24 rounded-md overflow-hidden bg-[#edf2ff]'>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="preview"
            className='w-full h-full object-cover'
          />
          <button
            type='button'
            className='absolute top-1 right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold hover:bg-red-600'
            onClick={() => setImageFile(null)}
          >
            ×
          </button>
        </div>
      )}
      <div className='flex justify-between gap-2'>
        <textarea
          ref={textareaRef}
          rows="1"
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-md bg-[#bdcfff] resize-none outline-none max-h-32 overflow-y-auto"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
        <button className='bg-blue-600 text-white rounded-full w-11 h-10 ps-[9px] cursor-pointer' onClick={handleSend} disabled={uploading}>
          {uploading ? (
            <span className='text-xs text-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="currentColor"><animate id="SVGKiXXedfO" attributeName="cy" begin="0;SVGgLulOGrw.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate attributeName="cy" begin="SVGKiXXedfO.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate id="SVGgLulOGrw" attributeName="cy" begin="SVGKiXXedfO.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle></svg>
            </span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M3.291 3.309a.75.75 0 0 0-.976.996l3.093 6.945H13a.75.75 0 0 1 0 1.5H5.408l-3.093 6.945a.75.75 0 0 0 .976.996l19-8a.75.75 0 0 0 0-1.382z" clipRule="evenodd"></path></svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default Input;