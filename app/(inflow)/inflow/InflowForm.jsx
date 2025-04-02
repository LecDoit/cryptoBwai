"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {useEffect,useState} from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {addInflow} from "./actions"

// ✅ Zod schema for form validation
const inflowSchema = z.object({
    pln:z
        .string({invalid_type_error:'PLN must be a number'})
        .min(0.01,'PLN must be greater than 0'),
    rate:z
        .string({invalid_type_error:'Rate must be a number'})
        .min(0.0001,'Rate must be greater than 0')

});

export default function InflowForm() {

    const [stableCoins,setStableCoins] = useState('')
    const [pln,setPln] = useState('')
    const [rate,setRate] = useState('')

    // ✅ useForm hook from React Hook Form
    const form = useForm({
        resolver: zodResolver(inflowSchema),
        defaultValues: {
        pln:'',
        rate:''
        },
    });
  
    const {control} = useForm()
    useEffect(()=>{
        if (pln && rate){
            setStableCoins(Number(pln)/Number(rate))
        } 
     
    },[rate,pln])

    const handleSubmit = (data) => {
        // Include stableCoins in the form data before submitting
        const formData = { ...data, stableCoins };
        console.log("Submitting form with data:", formData);
    
        // Pass formData to your addInflow function
        addInflow(formData); // Send data to your API
      };


  return (
    <Card className={"w-[400px]  m-4"}>
        <CardHeader>
        <CardTitle>Add Money</CardTitle>
        <CardDescription>Here you can add your record of inflow money</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form  
            // action={addInflow}
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                {/* ✅ PLN Field */}
            <FormField
            control={form.control}
            name="pln"
            render={({ field }) => (
                <FormItem>
                <FormLabel>PLN</FormLabel>
                <FormControl>
                    <Input
                    type="number"
                    placeholder="10 000"
                    {...field}
                    onChange={(e) => {
                        field.onChange(e); // Preserve existing form behavior
                        setPln(e.target.value)
                      }}
                    />
                </FormControl>
                <FormDescription>Enter your PLN amount.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

                {/* ✅ Rate Field */}
            <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                 
                    <FormItem>
                    <FormLabel>Rate</FormLabel>
                    <FormControl>
                        <Input
                        type="number"
                        placeholder="4.01"
                        {...field}
                        onChange={(e) => {
                            field.onChange(e); // Preserve existing form behavior
                            setRate(e.target.value)
                          }}
                        />
                    </FormControl>
                    <FormDescription>Put your FX rate</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="stableCoins"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Stable Coins Amount</FormLabel>
                    <FormControl>
                        <Input
                        type="number"
                        placeholder="2,493.76"
                        value={stableCoins}
                        readOnly
                        // {...field}
                        
                        />
                    </FormControl>
                    <FormDescription>This field is calculated automatically.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            {/* ✅ Submit Button */}
            <Button type="submit" className="w-full">
            Add
            </Button>

            </form>
        </Form>
        </CardContent>

    </Card>
        )
        }
