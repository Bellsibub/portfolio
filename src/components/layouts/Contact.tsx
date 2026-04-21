import {
    Button,
    Card,
    CardContent,
    CardFooter,
    Input,
    SectionHeader,
    Textarea,
} from '@/components/ui';
import { useContactSubmit } from '@/lib/react-query/useContactSubmit';
import { useState } from 'react';

type ContactProps = {} & React.HTMLAttributes<HTMLDivElement>;

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

export const Contact = ({ ...props }: ContactProps) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const { mutate, isPending, isSuccess, isError } = useContactSubmit();

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        mutate(form, { onSuccess: () => setForm(EMPTY_FORM) });
    }

    return (
        <div className="flex flex-col gap-10 p-2.5" {...props}>
            <SectionHeader title="Contact" className="uppercase" />
            <div>
                <p className="text-center text-lg text-text-secondary">
                    I&apos;m currently open to new opportunities and
                    collaborations. Whether you have a question, want to work
                    together, or just want to say hi, feel free to reach out!
                </p>
            </div>
            <Card variant="accent" className="md:w-md lg:w-xl mx-auto">
                <CardContent>
                    <form
                        id="contact-form"
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex gap-4">
                            <Input
                                name="name"
                                placeholder="Your name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Input
                            name="subject"
                            placeholder="Subject"
                            value={form.subject}
                            onChange={handleChange}
                            required
                        />
                        <Textarea
                            name="message"
                            placeholder="Message"
                            rows={5}
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                        {isSuccess && (
                            <p className="text-accent text-sm">Message sent!</p>
                        )}
                        {isError && (
                            <p className="text-danger text-sm">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        variant={isSuccess ? 'outline' : 'primary'}
                        form="contact-form"
                        disabled={isPending}
                    >
                        {isPending
                            ? 'Sending...'
                            : isSuccess
                              ? 'Send another'
                              : 'Send Message'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

Contact.displayName = 'Contact';
