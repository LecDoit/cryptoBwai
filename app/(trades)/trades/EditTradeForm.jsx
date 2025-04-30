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
import {updateTrade} from "./actions"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select"


const tradeSchema = z.object({

    
    closePrice: z.coerce.number({
      invalid_type_error: 'Close price must be a number',
      required_error: 'Close price is required',
    }).positive('Close price must be a positive number'),

    }) .refine((data) => {
      if (data.status === 'Close') {
        return !!data.closePrice && parseFloat(data.closePrice) > 0;
      }
      return true;
    }, {
      message: 'Close price is required when closing a trade',
      path: ['close'],
    })


export default function EditForm({price,trade}) {

    const [closePrice,setClosePrice] = useState(price)

    const form = useForm({
        resolver: zodResolver(tradeSchema),
        defaultValues: {
        closePrice:price,
        status:'Close',
        },
    });
  



    const handleSubmit = (data) => {
   
      
        trade.closePrice = data.closePrice
        trade.status='Close'

        const formData = { ...trade };
        // console.log("Submitting form with data:", formData,trade);

        updateTrade(trade.id , formData); // Send data to your API

        
      };


  return (
    <Card className={"w-[400px]  m-4"}>
        <CardHeader>
        <CardTitle>Close Trade</CardTitle>
        <CardDescription>Here you can close your trade</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form  
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                 
                <FormItem>
                    <FormLabel>Status of your trade will be</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Close">Close</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Move this trade to closed</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />



            <FormField
            control={form.control}
                name="closePrice"
                render={({ field }) => (
              <FormItem>
                <FormLabel>Close Price</FormLabel>
                <FormControl>
                        <Input
                        type="number"
                        placeholder="85 000"
                        {...field}
                        value={closePrice}
                        onChange={(e) => {
                            field.onChange(e); // Preserve existing form behavior
                            setClosePrice(e.target.value)
                          }}
                        />
                    </FormControl>
                <FormDescription>
                  Put your close price
                </FormDescription>
              </FormItem>
              )}
            />

            {/* ✅ Submit Button */}
            <Button type="submit" className="w-full">
            Close
            </Button>

            </form>
        </Form>
        </CardContent>

    </Card>
        )
        }
