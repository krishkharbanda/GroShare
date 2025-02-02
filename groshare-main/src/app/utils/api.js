const BASE_URL = "http://127.0.0.1:5000";

export const fetchDonations = async () => {
    const response = await fetch(`${BASE_URL}/get_donations`);
    return await response.json();
};

export const fetchShelters = async () => {
    const response = await fetch(`${BASE_URL}/get_shelters`);
    return await response.json();
};

export const matchDonations = async () => {
    const response = await fetch(`${BASE_URL}/match_donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    return await response.json();
};

export const addDonation = async (donationData) => {
    const response = await fetch(`${BASE_URL}/add_donation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
    });
    return await response.json();
};

export const requestPickup = async (pickupData) => {
    const response = await fetch(`${BASE_URL}/request_pickup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pickupData),
    });
    return await response.json();
};

import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const subscribeToDonations = (callback) => {
    const donationsRef = collection(db, "donations");

    return onSnapshot(donationsRef, (snapshot) => {
        const donations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(donations);
    });
};
