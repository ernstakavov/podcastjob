"use client";
import { toast } from "sonner";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name_2337889364: z.string().min(1),
  name_0807579407: z.string().min(1),
  name_9297985259: z.number().optional(),
  name_3586278862: z.number(),
  name_0751113797: z.string(),
  name_2823685959: z.string().min(1).optional(),
  name_8627913122: z.string().min(1),
  name_0877646622: z.string().min(300),
  name_1965419575: z.string().min(300),
  name_5344363374: z.string().optional(),
  name_2375358053: z.string().min(1),
  name_5329401059: z.string().min(1),
});

export const VacancyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
        {/* <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
          </div>
        </div> */}
        <FormField
          control={form.control}
          name="name_2337889364"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Работодатель</FormLabel>
              <FormControl>
                <Input placeholder="Либо Либо" type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_0807579407"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на сайт</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_9297985259"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Искомая должность в ₽</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Опционально</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_3586278862"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Зработная плата </FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Стартовая, либо вилка</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="name_0751113797"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Занятость</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  {[
                    ["Male", "male"],
                    ["Female", "female"],
                    ["Other", "other"],
                  ].map((option, index) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={index}
                    >
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_2823685959"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Опыт работы</FormLabel>
              <FormControl>
                <Input placeholder="100 лет" type="text" {...field} />
              </FormControl>
              <FormDescription>Опционально</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_8627913122"
          render={({ field }) => (
            <FormItem>
              <FormLabel>График работы</FormLabel>
              <FormControl>
                <Input placeholder="Пятидневка" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_0877646622"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Обязанности</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Минимум 20 строк</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_1965419575"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Требования</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Минимум 20 строк</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_5344363374"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дополнительные требования</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Опционально</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_2375358053"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Условия работы</FormLabel>
              <FormControl>
                <Input placeholder="" type="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_5329401059"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контакт</FormLabel>
              <FormControl>
                <Input placeholder="exmaple@mail.com" type="" {...field} />
              </FormControl>
              <FormDescription>Почта, номер телефона, тг</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
