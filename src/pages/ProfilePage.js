import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../redux/actions/profileActions';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: ''
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
