import {
    Button,
    Card,
    CardContent,
    CardFooter,
    Input,
    SectionHeader,
    Textarea,
} from '@/components/ui';

type ContactProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Contact = ({ ...props }: ContactProps) => {
    return (
        <div className="flex flex-col gap-10 p-2.5" {...props}>
            <SectionHeader title="Contact" className="uppercase" />
            <Card variant="accent" className="w-xl mx-auto">
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Input placeholder="Name" />
                            <Input type="email" placeholder="Email" />
                        </div>
                        <Input placeholder="Subject" />
                        <Textarea placeholder="Message" rows={5} />
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Send Message</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

Contact.displayName = 'Contact';
