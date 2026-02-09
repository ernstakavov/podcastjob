'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

type ContactFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

export const ContactField = <TFieldValues extends FieldValues>(
  props: ContactFieldProps<TFieldValues>,
) => {
  const { control, name } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Контакт</FormLabel>
          <FormControl>
            <Input placeholder='example@mail.com' type='text' {...field} />
          </FormControl>
          <FormDescription>Почта, номер телефона, тг</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
