'use client'

import { cn } from '@/lib/utils'
import { ChevronsUpDown, Check } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Dispatch, SetStateAction, useState } from 'react'

export interface ComboboxItem {
  label: string
  value: string
}

interface ComboboxProps {
  items: Array<{ label: string; value: string }>
  title: string
  value: string
  setValue: Dispatch<SetStateAction<ComboboxItem | undefined>>
  searchText: string
  disabled?: boolean
}

const Combobox: React.FC<ComboboxProps> = ({
  items,
  title,
  value,
  setValue,
  searchText,
  disabled,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
          disabled={disabled}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : title}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder={searchText} />
          <CommandEmpty>No match.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  setValue(item.value === value ? undefined : item)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item.value
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Combobox
