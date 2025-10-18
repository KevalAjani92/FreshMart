import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Camera,
  Trash2,
  Edit,
  Save,
  X,
  Upload
} from 'lucide-react';
import Card from '../../components/layout/StoreOwner/Card';
import Button from '../../components/layout/StoreOwner/Button';
import Modal from '../../components/layout/StoreOwner/Modal';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@freshmart.com',
    phone: '+1 234-567-8900',
    address: '123 Business Street, City, State 12345',
    bio: 'Passionate grocery store owner dedicated to providing fresh, quality products to the community. With over 10 years of experience in retail management.',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    joinedDate: 'January 15, 2020',
    role: 'Store Owner'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProfile(editedProfile);
    setIsEditing(false);
    setIsLoading(false);
    // Show success toast
    console.log('Profile updated successfully');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setEditedProfile({ ...editedProfile, profileImage: imageUrl });
        setShowImageModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setEditedProfile({ ...editedProfile, profileImage: '' });
    setShowRemoveImageModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-fresh-green flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl">
              <User className="h-8 w-8 text-white" />
            </div>
            Owner Profile
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Manage your personal information and account settings
          </motion.p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar Section */}
        <Card className="p-8 grocery-pattern">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="relative">
                {editedProfile.profileImage ? (
                  <img
                    src={editedProfile.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-2xl object-cover shadow-fresh border-4 border-white"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl flex items-center justify-center shadow-fresh border-4 border-white">
                    <User className="h-16 w-16 text-white" />
                  </div>
                )}
                
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2 flex space-x-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowImageModal(true)}
                      className="p-2 bg-fresh-green text-white rounded-xl shadow-fresh hover:bg-emerald-600 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                    </motion.button>
                    {editedProfile.profileImage && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowRemoveImageModal(true)}
                        className="p-2 bg-red-500 text-white rounded-xl shadow-fresh hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
              <p className="text-fresh-green font-semibold">{profile.role}</p>
              <div className="flex items-center justify-center space-x-2 mt-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Joined {profile.joinedDate}</span>
              </div>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="p-4 bg-white rounded-2xl border border-gray-200">
                <p className="text-sm text-gray-600">Store Performance</p>
                <p className="text-2xl font-bold text-fresh-green">Excellent</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-200">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-grocery-orange">2,847</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-200">
                <p className="text-sm text-gray-600">Customer Rating</p>
                <p className="text-2xl font-bold text-grocery-yellow">4.8 ⭐</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Column - Profile Information */}
        <Card className="lg:col-span-2 p-8">
          <h3 className="text-xl font-semibold text-fresh-green mb-6">Profile Information</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.fullName}
                    onChange={(e) => setEditedProfile({ ...editedProfile, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200">
                    {profile.fullName}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200">
                    {profile.email}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200">
                    {profile.phone}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.address}
                    onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200">
                    {profile.address}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio / Description
              </label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 min-h-[100px]">
                  {profile.bio}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Image Upload Modal */}
      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        title="Update Profile Image"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-fresh-green transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Choose a new profile image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button as="span" className="cursor-pointer">
                  <Camera className="h-4 w-4 mr-2" />
                  Select Image
                </Button>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowImageModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Remove Image Confirmation Modal */}
      <Modal
        isOpen={showRemoveImageModal}
        onClose={() => setShowRemoveImageModal(false)}
        title="Remove Profile Image"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to remove your profile image? This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowRemoveImageModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleRemoveImage}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Image
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Profile;