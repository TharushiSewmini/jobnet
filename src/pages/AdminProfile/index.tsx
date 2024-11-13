import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../../utils/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { FiEdit3, FiSave, FiCamera } from 'react-icons/fi';
import { Spin } from 'antd';
import '../../assets/99x.png';
import MaterPlusbtn from "../../components/MasterPlusButton";

interface ProfileData {
  userFullName: string;
  userEmail: string;
  bio: string;
  location: string;
  userImage: string;
  userType: string;
}

const defaultProfile: ProfileData = {
  userFullName: '',
  userEmail: '',
  bio: '',
  location: '',
  userImage: '',
  userType: '',
};

const AdminProfile = () => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [tempProfile, setTempProfile] = useState<ProfileData>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(false);
  const onClick=()=>{setClick(!click);
  }

  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;

  const fetchProfile = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn('No profile document found');
        setLoading(false);
        return;
      }

      const userData = docSnap.data() as ProfileData;

      console.log(userData.userImage);
      
      
      const cleanProfile: ProfileData =  {
        userFullName: userData.userFullName ,
        userEmail: userData.userEmail ,
        bio: userData.bio ,
        location: userData.location ,
        userImage: userData.userImage ,
        userType: userData.userType ,
      };
 
      
      setProfile(cleanProfile);
      console.log("ewdew", cleanProfile.userImage, profile.userImage);
      
      setTempProfile(cleanProfile);

      if (!userData.userType) {
        console.warn('Invalid user type');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    setLoading(true);
    try {
      let updatedPhotoURL = profile.userImage;

      if (file) {
        const storageRef = ref(storage, "profile_pictures/${userId}");
        await uploadBytes(storageRef, file);
        updatedPhotoURL = await getDownloadURL(storageRef);
      }

      const updatedProfile = { ...tempProfile, photoURL: updatedPhotoURL };
      await setDoc(doc(db, 'users', userId), updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
      setFile(null);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-6">
          {profile?.userType === 'Admin' ? 'My Profile' : 'User Profile'}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            {/* Profile Picture */}
            <div className="flex justify-center mb-6 relative">
              <div className="relative">
                <img
                  src={profile.userImage ? profile.userImage : "https://ui-avatars.com/api/?name=${profile.userFullName}"}
               
                  className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-green-700"
                />
              </div>
            </div>

            {/* Admin/User Info */}
            <div className="text-center mb-8">
              <p className="text-xl font-semibold text-green-800">{profile.userFullName}</p>
              <p className="text-lg text-green-700">{profile.userEmail}</p>
            </div>

            {isEditing ? (
              <div className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={tempProfile.userFullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={tempProfile.userEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Email"
                />
                <textarea
                  name="bio"
                  value={tempProfile.bio}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Bio"
                />
                <input
                  type="text"
                  name="location"
                  value={tempProfile.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Location"
                />
               

                <button
                  onClick={handleSave}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <FiSave /> Save
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-green-700"><strong>Bio:</strong> {profile.bio || 'No bio available'}</p>
                <p className="text-green-700"><strong>Location:</strong> {profile.location || 'Not set'}</p>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <FiEdit3 /> Edit Profile
                </button>
              </div>
            )}
             <  MaterPlusbtn isClick={click} onClick={onClick}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
