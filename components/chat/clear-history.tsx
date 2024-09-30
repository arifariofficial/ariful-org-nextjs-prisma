"use client";

import * as React from "react";
import { toast } from "sonner";

import { ServerActionResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconSpinner } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { useChats } from "@/lib/hooks/useChats";
import { Session } from "next-auth";

interface ClearHistoryProps {
  isEnabled: boolean;
  clearChats: () => ServerActionResult<void>;
  session?: Session;
}

export function ClearHistory({
  isEnabled = false,
  clearChats,
  session,
}: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const { loadChats } = useChats();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="flex w-full self-center">
        <Button variant="outline" disabled={!isEnabled || isPending}>
          {isPending && <IconSpinner className="mr-2" />}
          Clear history
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your chat history and remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(event: { preventDefault: () => void }) => {
              event.preventDefault();
              startTransition(async () => {
                const result = await clearChats();
                if (result && "error" in result) {
                  toast.error(result.error);
                  return;
                }

                setOpen(false);
                router.push("/chat");
                loadChats(session?.user?.id ?? "");
              });
            }}
          >
            {isPending && <IconSpinner className="mr-2 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
