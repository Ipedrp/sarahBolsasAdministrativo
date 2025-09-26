import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface CardProps {
    title: string;
    icon: any;
}

export function Cards({ title, icon }: CardProps) {
    return (
        <div>
            <Card className="relative overflow-hidden min-h-[150px] sm:min-h-[180px] cursor-pointer">
                {/* SVG como background */}
                <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 200"
                    preserveAspectRatio="xMidYMid slice"
                    role="img"
                    aria-labelledby="backgroundDecoTitle"
                >
                    <title id="backgroundDecoTitle">Decoration for card background</title>

                    <defs>
                        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="oklch(0.4 0.14 25.72)" stopOpacity="0.88" />
                            <stop offset="65%" stopColor="oklch(0.4 0.14 25.72)" stopOpacity="0.91" />
                            <stop offset="100%" stopColor="oklch(0.4 0.14 25.72)" stopOpacity="0.13" />
                        </linearGradient>

                        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="20" result="b" />
                            <feOffset dx="0" dy="6" result="o" />
                            <feBlend in="SourceGraphic" in2="o" />
                        </filter>
                    </defs>

                    <path
                        d="M0,80 C150,20 350,140 600,110 C850,80 1050,40 1200,90 L1200,200 L0,200 Z"
                        fill="url(#g1)"
                        filter="url(#softShadow)"
                    />

                    <circle cx="1050" cy="30" r="22" fill="oklch(0.4 0.14 25.72)" opacity="0.12" />

                    <rect x="80" y="35" rx="10" ry="10" width="120" height="36" fill="oklch(0.4 0.14 25.72)" opacity="0.06" />
                </svg>

                {/* Conteúdo do Card */}
                <CardHeader className="relative">
                    <CardTitle>{title}</CardTitle>
                    <CardAction>{icon}</CardAction>
                </CardHeader>
            </Card>
        </div>
    );
}
