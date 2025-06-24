  import React, { useContext, useEffect, useState } from 'react'
  import { ShopContext } from '../context/ShopContext';
  import { assets } from '../assets/assets';
  import Title from '../components/Title';
  import Productitem from '../components/Productitem';
  

  const Collection = () => {
    const { products,search,showSearch } = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false) // Controls visibility of filter section (used for small screens).
    const [filterProducts, setFilterProducts] = useState([]);//Stores the final list of products after filters are applied.
    const [Category,setCategory]=useState([])//stores selected main categories (e.g., Men, Women, Kids)
    const[subCategory,setSubCategory]=useState([])//Stores selected subcategories (e.g., Topwear, Bottomwear, Winterwear).
    const[sortType,setSortType]=useState('relevant')
    const toggleCategory =(e)=>{
      if(Category.includes(e.target.value)){
        setCategory(prev => prev.filter(item => item !== e.target.value));
      }
      else{
        setCategory(prev => [...prev, e.target.value])
      }
    }

  // toggleSubCategory = Adds/removes main category from selected filters when checkbox is clicked.

    const toggleSubCategory=(e)=>{
      if(subCategory.includes(e.target.value)){
        setSubCategory(prev => prev.filter(item => item !== e.target.value));
      }
      else{
        setSubCategory(prev => [...prev, e.target.value])
      }

    }

    // Filters products based on selected categories and subcategories.
    const applyFilter=()=>{
      let productsCopy = products.slice(); // make copy of products
       if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    
      if(Category.length>0){
        productsCopy= productsCopy.filter(item=>Category.includes(item.category))
      }
      if(subCategory.length>0){
        productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
      }

  setFilterProducts(productsCopy)
    }



    const sortProduct=()=>{
      let fpCopy = filterProducts.slice();   //take the filteror selected proucts then apply
      switch (sortType){
        case 'low-high':
          setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
          break;
        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
          break;
        default:
          applyFilter();
          break;
      }
    }

    // useEffect(()=>{
    //   setFilterProducts(products);
    // },[])

    useEffect(()=>{    //Whenever the filter state changes, this re-filters the products.
      applyFilter()
    },[Category,subCategory,search,showSearch,products])

    useEffect(()=>{
      sortProduct();
    }, [sortType])

  

    return (
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/*filter Options*/}
        <div className='min-w-60'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 tex-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
              </p>

              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/>kids
              </p>
            </div>

          </div>
          {/* subcategory filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 tex-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
              </p>

              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
              </p>
            </div>

          </div>

        </div>




        {/* rightside */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'All'} text2={'COLLECTIONS'}></Title>
            {/* PRODUCT SORT */}
            <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
              <option value="relevant">Sort BY: Relavent</option>
              <option value="low-high">Sort BY: Low to High</option>
              <option value="high-low">Sort BY: High to Low</option>
            </select>
          </div>

          {/* map products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
        filterProducts.map((item,index)=>(
          <Productitem key={index} name={item.name} id={item._id} price={item.price} image={item.images}/>
        ))
          }
          </div>

        </div>

      </div>
    )
  }

  export default Collection;
