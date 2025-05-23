import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import  { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'

export async function POST(request){

    const inflow = await  request.json()
    console.log('request is happening',request)


    const supabase = createRouteHandlerClient({cookies});

    const {data:{session}} = await supabase.auth.getSession()

    const {data,error} = await supabase.from('inflow')
        .insert({
            ...inflow,
            user_email:session.user.email

        })
        .select()
        .single()
        
    
    return NextResponse.json({data,error})
}

