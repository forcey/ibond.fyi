import { InfoCircledIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import { ReactNode } from 'react';

import "./InfoPopover.css";

export function InfoPopover({ children }: { children: ReactNode }): JSX.Element {
    return <Popover.Root>
        <Popover.Trigger asChild>
            <button className="IconButton">
                <InfoCircledIcon />
            </button>
        </Popover.Trigger>
        <Popover.Portal>
            <Popover.Content className="PopoverContent" sideOffset={5}>
                {children}
                <Popover.Arrow className="PopoverArrow" />
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
}