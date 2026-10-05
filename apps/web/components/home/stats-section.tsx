export function StatsSection() {
    return (
        <section className="py-12 border-y bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: 'Universities', value: '500+' },
                        { label: 'Countries', value: '20+' },
                        { label: 'Students Placed', value: '10k+' },
                        { label: 'Visa Success', value: '98%' },
                    ].map((stat, index) => (
                        <div key={index} className="space-y-2">
                            <h3 className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</h3>
                            <p className="text-muted-foreground font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
