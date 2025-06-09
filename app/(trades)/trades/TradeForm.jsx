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
import {addTrade} from "./actions"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select"


const tradeSchema = z.object({
    currency:z
        .string({invalid_type_error:'Currency must be a selected'})
        .min(0.01,'Field is required'),
        
    price:z
        .string({invalid_type_error:'Price must be a number'})
        .min(0.01,'Field is required'),
    amount:z
        .string({invalid_type_error:'Amount must be a number'})
        .min(0.01,'Field is required'),
    type:z
        .string({invalid_type_error:'Type must be a selected'})
        .min(0.01,'Field is required'),
    status:z
        .string({invalid_type_error:'Amount must be a number'})
        .min(0.01,'Field is required'),
    leverage:z
        .string({invalid_type_error:'Levarage must be a number'})
        .optional()
        .default("1"),
    closePrice:z
        .string({invalid_type_error:'Close must be a number'})
        .optional()

    }) .refine((data) => {
      if (data.status === 'Close') {
        return !!data.closePrice && parseFloat(data.closePrice) > 0;
      }
      return true;
    }, {
      message: 'Close price is required when closing a trade',
      path: ['close'],
    })
    .refine((data) => {
      if (data.type === 'Short') {
        return !!data.leverage && parseFloat(data.leverage) > 0;
      }
      return true;
    }, {
      message: 'Leverage is required when type is Short',
      path: ['leverage'],
    });

export default function TradeForm(prices) {

    console.log(prices)

    const [curr,setCurr] =useState(prices)
    const [price,setPrice] = useState('')
    const [amount,setAmount] = useState('')
    const [closePrice,setClosePrice] = useState('')
    const [leverage,setLeverage] = useState('')


    const form = useForm({
        resolver: zodResolver(tradeSchema),
        defaultValues: {
        currency:'',
        price:'',
        amount:'',
        type:'',
        leverage:"1",
        close:'',
        },
    });
  
    const {control} = useForm()
    const watchType = form.watch("type");
    const watchStatus = form.watch('status')


    const handleSubmit = (data) => {

        const formData = { ...data };
        console.log("Submitting form with data:", formData);

        addTrade(formData); // Send data to your API

        
      };


  return (
    <Card className={"w-[400px]  m-4"}>
        <CardHeader>
        <CardTitle>Add Trade</CardTitle>
        <CardDescription>Here you can add your open or closed trade</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form  
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
            <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                 
                <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {prices.prices.map((price,i)=>{
                          return ( 
                            <SelectItem key={i} value={price.symbol}>{price.name}</SelectItem>
                          )
                        })}
                      </SelectContent>

                    </Select>
                    <FormDescription>Select currency</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />

                {/* ✅ Rate Field */}
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                 
                    <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input
                        type="number"
                        placeholder="80 000"
                        {...field}
                        value={price}
                        onChange={(e) => {
                            field.onChange(e); // Preserve existing form behavior
                            setPrice(e.target.value)
                          }}
                        />
                    </FormControl>
                    <FormDescription>Put your price</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
                {/* ✅ Rate Field */}
            <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                 
                    <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                        <Input
                        type="number"
                        placeholder="5 000"
                        {...field}
                        value={amount}
                        onChange={(e) => {
                            field.onChange(e); // Preserve existing form behavior
                            setAmount(e.target.value)
                          }}
                        />
                    </FormControl>
                    <FormDescription>Put amount</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
                {/* ✅ Rate Field */}
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                 
                <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Long">Long</SelectItem>
                        <SelectItem value="Short">Short</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select whether this is a Long or Short trade</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />


           {watchType === "Short" && (
            <FormField
            control={form.control}
                name="leverage"
                render={({ field }) => (
              <FormItem>
                <FormLabel>Leverage</FormLabel>
                <FormControl>
                        <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        onChange={(e) => {
                            field.onChange(e); // Preserve existing form behavior
                            setLeverage(e.target.value)
                          }}
                        />
                    </FormControl>
                <FormDescription>
                  Select leverage
                </FormDescription>
              </FormItem>
              )}
            />
            )}

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                 
                <FormItem>
                    <FormLabel>Open or Closed</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Close">Close</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select whether this is a New or Completed Trade</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />


           {watchStatus === "Close" && (
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
            )}

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
