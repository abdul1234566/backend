import RoomsType from '../Modals/RoomsType.mjs';  // make sure the path is correct


// export const getAllRoomType = async (req, res) => {
//   try {
//     const roomTypes = await RoomsType.find(); // returns an array
//     res.status(200).json(roomTypes);          // make sure it's an array
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching room types" });
//   }
// };



export const getAllRoomsType = async (req, res) => {
  try {
 const types = await RoomsType.find().limit(); // fetch all room types from MongoDB
    res.status(200).json(RoomsType); // return as array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Add a new room type with image
let addRoomTypewithimage=async(req,res)=>{
  try {
      console.log(req.file.path);
      let newRoomType = new RoomsType({
       name:req.body.name,
       description:req.body.description,
       image:req.file.path,
       
  
  });
  let addroomtype = await newRoomType.save();
  if (!addroomtype) {
         res.status(404).json({message:"Failed to add room type"});
  } else {
  
      res.status(200).json({
      message:"Room type added successfully",
      roomtype:addroomtype,
  })
  } 
  } catch (error) {
     console.log(error) ;
     res.status(500).json({message:"Internal server error"});
  }
  }

// Update a room type
let updateRoomType = async(req,res)=>{
  try {
      let id=req.params.id;
      let updateData = { ...req.body };
      
      // Handle file upload if new image is provided
      if (req.file) {
          updateData.image = req.file.path;
      }
      
      let updateRoomType=await RoomsType.findByIdAndUpdate(id, updateData, {new:true});
      if(!updateRoomType){
          res.status(404).json({message:"Room type not found"});
      }else{
          res.status(200).json({message:"Room type updated successfully",roomtype:updateRoomType});
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"});
  }
}

// Delete a room type
let deleteRoomType = async(req,res)=>{
  try {
      let id=req.params.id;
      let deleteRoomType=await RoomsType.findByIdAndDelete(id);
      if(!deleteRoomType){
          res.status(404).json({message:"Room type not found"});
      }else{
          res.status(200).json({message:"Room type deleted successfully"});
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"});
  }
}

// Get only 4 room types
let getFourRoomTypes = async (req, res) => {
  try {
    let roomtype = await RoomsType.find();
    if (roomtype.length == 0) {
      res.status(404).json({ message: "No room types found" });
    } else {
      res.status(200).json({
        message: "Our Room Types",
        roomtype: roomtype,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const RoomTypeController = {getAllRoomsType, addRoomTypewithimage, updateRoomType, deleteRoomType, getFourRoomTypes};
export default RoomTypeController;




// import RoomTypes from '../Modals/RoomsType.mjs'

// export const getAllRoomType = async (req, res) => {
//   try {
//     const roomTypes = await RoomTypes.find(); // Returns an array
//     console.log('Fetched room types:', roomTypes); // Temporary logging for debugging
//     res.status(200).json(roomTypes); // Ensure it's an array
//   } catch (err) {
//     console.error('Error fetching room types:', err);
//     res.status(500).json({ message: "Error fetching room types" });
//   }
// };

// // Add a new room type with image
// let addRoomTypewithimage = async (req, res) => {
//   try {
//     console.log(req.file.path);
//     let newRoomType = new RoomTypes({
//       name: req.body.name,
//       description: req.body.description,
//       image: req.file.path,
//       price: req.body.price, // Added to match schema
//       capacity: req.body.capacity, // Added
//       features: req.body.features ? req.body.features.split(',') : [] // Assuming features come as comma-separated string
//     });
//     let addroomtype = await newRoomType.save();
//     if (!addroomtype) {
//       res.status(404).json({ message: "Failed to add room type" });
//     } else {
//       res.status(200).json({
//         message: "Room type added successfully",
//         roomtype: addroomtype,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Update a room type
// let updateRoomType = async (req, res) => {
//   try {
//     let id = req.params.id;
//     let updateData = { ...req.body };
    
//     // Handle file upload if new image is provided
//     if (req.file) {
//       updateData.image = req.file.path;
//     }
    
//     // Ensure features is an array if provided
//     if (updateData.features && typeof updateData.features === 'string') {
//       updateData.features = updateData.features.split(',');
//     }
    
//     let updateRoomType = await RoomTypes.findByIdAndUpdate(id, updateData, { new: true });
//     if (!updateRoomType) {
//       res.status(404).json({ message: "Room type not found" });
//     } else {
//       res.status(200).json({ message: "Room type updated successfully", roomtype: updateRoomType });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Delete a room type
// let deleteRoomType = async (req, res) => {
//   try {
//     let id = req.params.id;
//     let deleteRoomType = await RoomTypes.findByIdAndDelete(id);
//     if (!deleteRoomType) {
//       res.status(404).json({ message: "Room type not found" });
//     } else {
//       res.status(200).json({ message: "Room type deleted successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Get only 4 room types
// let getFourRoomTypes = async (req, res) => {
//   try {
//     let roomtype = await RoomTypes.find().limit(4);
//     if (roomtype.length == 0) {
//       res.status(404).json({ message: "No room types found" });
//     } else {
//       res.status(200).json({
//         message: "Our Room Types",
//         roomtype: roomtype,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const RoomTypeController = { getAllRoomType, addRoomTypewithimage, updateRoomType, deleteRoomType, getFourRoomTypes };
// export default RoomTypeController;