import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img
            title="إيفيا"
            src="/images/logo.png"
            alt="إيفيا"
            className="h-10 w-auto object-contain"
        />
    );
}
