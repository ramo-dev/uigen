import { NextResponse } from 'next/server';



export async function POST(request){
    const text = await request.json();
    // const {searchParams} = new URL(request.url);
    // const obj = Object.fromEntries(searchParams.entries());
    console.log(text)
    const obj = {"name" : text}
    return NextResponse.json(obj)
}

