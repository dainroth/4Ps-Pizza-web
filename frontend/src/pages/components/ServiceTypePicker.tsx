import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ServiceTypeOption {
  value: string;
  description?: string;
  image: string;
}

const serviceTypeOptions: ServiceTypeOption[] = [
  {
    value: "Inside",
    image:
      "https://1.image.cdn.tablecheck.com/unsafe/fit-in/1920x1080/filters:format(webp)/https://cdn0.tablecheck.com/service_categories/6a62eab95153ed3654cb17c6/images/xl/55c1c40c.jpg?1786784709",
  },
  {
    value: "Outside",
    description:
      "Outside seat with a view from the terrace balcony, overlooking green, tree-lined riverbanks, a wide stretch of river, and a distant city skyline.",
    image:
      "https://image.cdn.tablecheck.com/unsafe/fit-in/1920x1080/filters:format(webp)/https://cdn2.tablecheck.com/service_categories/6a62eac5286bac824693ebcf/images/xl/3ef201b1.jpg?1786784345",
  },
  {
    value: "Pizza Counter",
    description:
      "Solo diners, casual date nights, or small pairs looking for an interactive, lively atmosphere rather than a traditional dining table.",
    image:
      "https://image.cdn.tablecheck.com/unsafe/fit-in/1920x1080/filters:format(webp)/https://cdn1.tablecheck.com/service_categories/6a802c1e1a6112fa355533b5/images/xl/d56f5e21.jpg?1786784798",
  },
  {
    value: "Semi-Private",
    description:
      "Business dinners, celebrations, double dates, or any gathering where you want to speak easily without ambient noise interrupting your conversation.",
    image:
      "https://3.image.cdn.tablecheck.com/unsafe/fit-in/1920x1080/filters:format(webp)/https://cdn2.tablecheck.com/service_categories/6a8034e60613f5d156763032/images/xl/8fe7a09f.jpeg?1787276317",
  },
];
interface ServiceTypePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ServiceTypePicker({
  value,
  onChange,
}: ServiceTypePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full space-y-2">
      <Label>Service type</Label>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[var(--color-ink)]/20 bg-[var(--color-cream)] px-4 py-2.5 text-left text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)]/20"
          >
            <span
              className={value ? "font-medium" : "text-[var(--color-ink)]/50"}
            >
              {value || "Select a service type"}
            </span>
            <span className="text-xs text-[var(--color-ink)]/60">▾</span>
          </button>
        </DialogTrigger>

        <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] max-w-lg overflow-hidden p-0 sm:rounded-xl">
          <DialogHeader className="border-b border-[var(--color-ink)]/10 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-[var(--color-ink)]">
              Service type
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[calc(85vh-80px)] overflow-y-auto divide-y divide-[var(--color-ink)]/10 px-2">
            {serviceTypeOptions.map((option) => {
              const isSelected = value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`group flex w-full items-center justify-between gap-4 rounded-lg p-4 text-left transition-all cursor-pointer hover:bg-[var(--color-ink)]/5 ${
                    isSelected ? "bg-[var(--color-ink)]/5" : ""
                  }`}
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[var(--color-ink)] text-base">
                        {option.value}
                      </p>
                      {isSelected && (
                        <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-ink)]" />
                      )}
                    </div>
                    {option.description && (
                      <p className="mt-1 text-sm text-[var(--color-ink)]/70 leading-relaxed">
                        {option.description}
                      </p>
                    )}
                  </div>

                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.value}
                      className="h-20 w-20 shrink-0 rounded-lg object-cover border border-[var(--color-ink)]/10 shadow-xs transition-transform group-hover:scale-105"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
