import {
    Button,
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastTitle,
    ToastViewport,
} from '@/components/ui';
import { useState } from 'react';

import { StoryBlock, StoryGroup } from '../StoryBlock';

type ToastVariant = 'default' | 'success' | 'error';

interface ToastState {
    open: boolean;
    variant: ToastVariant;
    title: string;
    description: string;
    action?: string;
}

const INITIAL: ToastState = {
    open: false,
    variant: 'default',
    title: '',
    description: '',
};

export function ToastStory() {
    const [toast, setToast] = useState<ToastState>(INITIAL);

    function fire(
        variant: ToastVariant,
        title: string,
        description: string,
        action?: string,
    ) {
        setToast({ open: false, variant, title, description, action });
        // give Radix a tick to register the close before reopening
        setTimeout(
            () => setToast({ open: true, variant, title, description, action }),
            50,
        );
    }

    return (
        <>
            <div className="space-y-10">
                <StoryGroup title="Variants">
                    <StoryBlock label="default">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                fire(
                                    'default',
                                    'Heads up!',
                                    'Your session will expire in 5 minutes.',
                                )
                            }
                        >
                            Show default toast
                        </Button>
                    </StoryBlock>
                    <StoryBlock label="success">
                        <Button
                            variant="primary"
                            onClick={() =>
                                fire(
                                    'success',
                                    'Changes saved',
                                    'Your profile has been updated successfully.',
                                    'Undo',
                                )
                            }
                        >
                            Show success toast
                        </Button>
                    </StoryBlock>
                    <StoryBlock label="error">
                        <Button
                            variant="danger"
                            onClick={() =>
                                fire(
                                    'error',
                                    'Something went wrong',
                                    'Failed to save changes. Please try again.',
                                )
                            }
                        >
                            Show error toast
                        </Button>
                    </StoryBlock>
                </StoryGroup>
            </div>

            <Toast
                open={toast.open}
                onOpenChange={(open) => setToast((t) => ({ ...t, open }))}
                variant={toast.variant}
                duration={4000}
            >
                <div className="flex-1 space-y-1">
                    <ToastTitle>{toast.title}</ToastTitle>
                    <ToastDescription>{toast.description}</ToastDescription>
                </div>
                {toast.action && (
                    <ToastAction altText={toast.action}>
                        {toast.action}
                    </ToastAction>
                )}
                <ToastClose />
            </Toast>

            <ToastViewport />
        </>
    );
}
