import React from "react";
import { useEffect, useState } from "react";

// function list() {
//     const productData = [
//         {   pname: "Laptop", category: "Electronics"    },
//         {   pname: "T-shirt", category: "Clothing"    },
//         {   pname: "Fridge", category: "Electronics"    },
//         {   pname: "Shoes", category: "Footwear"    },
//         {   pname: "Sandel", category: "Footwear"    },
//         {   pname: "Jacket", category: "Clothing"    },        
//         {   pname: "Slipper", category: "Footwear"    },        
//         {   pname: "Kurta", category: "Clothing"    },        
//         {   pname: "Crocs", category: "Footwear"    },        
//         {   pname: "Mouse", category: "Electronics"    },        
//         {   pname: "Fan", category: "Electronics"    },        
//         {   pname: "Light", category: "Electronics"    },        
//         {   pname: "Jacket", category: "Clothing"    },        
//         {   pname: "Jacket", category: "Clothing"    },        
//     ];

//     const [items, setItems] = useState([]);
    
//     const [selectedCategory, setSelectedCategory] = useState("");

//     const filterProduct = selectedCategory ? items.filter(item => item.category === selectedCategory) : items;


//     useEffect(() => {
//         const savedProduct = localStorage.getItem("ProductList");
//         if(savedProduct){
//             setItems(JSON.parse(savedProduct));
//         }
//         else{
//             setItems(productData);
//             localStorage.setItem("ProductList",JSON.stringify(productData));
//         }        
//     },[])

//     return(
//         <>
//             <div className="container mx-auto">
//                 <h1 className="mb-3  my-25 text-3xl font-bold">Filter Items</h1>
//                 <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}> 

//                     <option value="">All Category</option>
//                     <option value="Electronics">Electronics</option>
//                     <option value="Clothing">Clothing</option>
//                     <option value="Footwear">Footwear</option>
//                 </select>
//                 <table className="">
//                     <tr className="font-bold text-2xl text-center">
//                         <td className="border-1 p-2">Product Name</td>
//                         <td className="border-1 p-2">Product Category</td>
//                     </tr>
//                     {
//                         filterProduct.map((item,index) => (
//                             <tr key={index}>
//                                 <td className="border-1 p-2">{item.pname}</td>
//                                 <td className="border-1 p-2">{item.category}</td>
//                             </tr>
//                         ))
//                     }
                    
//                 </table>
//             </div>
//         </>
//     )
// }

 const [books, setBook] = useState([]);

    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        const savedBooks = localStorage.getItem("BookList");
        if(savedBooks){
            setBook(JSON.parse(savedBooks))
        }
        else{
            setBook(bookData);
            localStorage.setItem("BookList",JSON.stringify(bookData));
        }
    },[]);

    let sortedBooks = [...books];
    if(sortOption === "bname"){
        sortedBooks.sort((a,b) => a.bname.localeCompare(b.bname))
    }
    else if(sortOption === "priceLowToHigh"){
        sortedBooks.sort((a,b) => a.price - b.price)
    }
    else if(sortOption === "priceHghToLow"){
        sortedBooks.sort((a,b) => b.price - a.price)
    }


export default list;

