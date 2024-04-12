import  { useState, useEffect } from 'react';
import axios from 'axios';

interface City {
  name: string;
  country_Code: string;
  timezone: string;
}
interface Props {
  setToggle: (toggle: boolean) => void;
  setValue: (value: string) => void;
}

const CityList: React.FC<Props> = ({setToggle,setValue}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `https://documentation-resources.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&offset=${(page - 1) * 10}`
        );
        const cityData: City[] = response.data.results.map((record: any) => ({
          name: record.name,
          country_Code: record.country_code,
          timezone: record.timezone
        }));
        setCities(cityData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [page]);

  
  const handleTable = async (city:City) => {
    const {name} = city 
    setValue(name)
    setToggle(true)
    
};

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-center text-gray-600  font-bold uppercase">NO.</th>
              <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">City Name</th>
              <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Country Code</th>
              <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold uppercase">Timezone</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {cities.map((city, index) => (
              <tr key={index} className='hover:bg-gray-200' onClick={()=>handleTable(city)} >
                <td className="py-4 px-6 border-b border-gray-200">{(page - 1) * 10 + index + 1}</td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">{city.name}</td>
                <td className="py-4 px-6 border-b border-gray-200">{city.country_Code}</td>
                <td className="py-4 px-6 border-b border-gray-200">{city.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
          onClick={prevPage}
        >
          Previous Page
        </button>
        <button disabled className='px-5' >{page}</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
          onClick={nextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CityList;
