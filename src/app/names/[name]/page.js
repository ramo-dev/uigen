import React from 'react';

const getGnder = async(name) => {
     const resp = await fetch(`https://api.genderize.io/?name=${name}`);
     return resp.json();
}   

const getAge = async(name) => {
    const resp = await fetch(`https://api.agify.io/?name=${name}`);
    return resp.json();
} 

const getCountry = async(name) => {
    const resp = await fetch(`https://api.nationalize.io/?name=${name}`);
    return resp.json();
} 




const page = async ({params}) => {
    const ageData = getAge(params.name);
    const genderData = getGnder(params.name);
    const countryData = getCountry(params.name);

    const [age, gender, country] = await Promise.all([ageData, genderData, countryData])
  return (
    <div>
        <h1>{params.name}</h1>
        <h1>Age : {age?.age}</h1>
        <h1>Gender : {gender?.gender}</h1>
        <h1>Country : {country?.country?.[0]?.country_id}</h1>
    </div>
  )
}

export default page