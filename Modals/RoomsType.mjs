// import mongoose from "mongoose";
// const { Schema } = mongoose;


// const roomTypesSchema = new Schema({
//     name: {
//          type: String,
//           required: true,
//           unique: true
//          },
//     description: { 
//         type: String
//      },
//     image: {
//          type: String,
//          required: true
//          },     
// });

// const RoomTypes = mongoose.model("roomTypes", roomTypesSchema);
// export default RoomTypes;






import mongoose from "mongoose";
const { Schema } = mongoose;

const roomTypesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: { 
        type: String,
        required: false // Optional, but good for cards
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false, // Optional: e.g., 150 for $150/night
        min: 0
    },
    capacity: {
        type: Number,
        required: false, // Optional: e.g., 2 for max guests
        min: 1
    },
    features: {
        type: [String], // Array of strings, e.g., ["WiFi", "Balcony"]
        required: false,
        default: []
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

const RoomTypes = mongoose.model("roomTypes", roomTypesSchema); // Model name matches your original
export default RoomTypes;