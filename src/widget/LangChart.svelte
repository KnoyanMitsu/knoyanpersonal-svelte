<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import Language from '../controller/FetchLanguage';

    let chartInstance;
    let chartCanvas;
    let delayed;

    onMount(async () => {
        const response = new Language(import.meta.env.VITE_NAME, import.meta.env.VITE_API_KEY);

        try {
            const stats = await response.GetStats();
            const targetLang = ["Vue", "PHP", "Python","Svelte"];
            const filteredStats = stats.filter((stat) => targetLang.includes(stat.language));
            const chartData = {
                labels: filteredStats.map((stat) => stat.language),
                datasets: [
                    {
                        label: 'Language Usage (%)',
                        data: filteredStats.map((stat) =>
                        parseFloat(stat.percentage.replace('%', ''))
                        ),
                        backgroundColor: filteredStats.map((stat) => stat.color || '#888'), // Gunakan warna default jika `color` tidak tersedia
                        borderColor: filteredStats.map((stat) => stat.color || '#555'),
                        borderWidth: 1,
                    },
                ],
            };

            chartInstance = new Chart(chartCanvas, {
                type: 'bar',
                data: chartData,
                options: {
                    animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                        }
                        return delay;
                    },
                    },
                    responsive: true,
                    indexAxis: 'y',
                    scales: {
                        y: {
                            stacked: true,
                        },
                        x: {
                            stacked: true,
                        }
                    },
                },
            });
        } catch (error) {
            console.error('Failed to fetch statistics:', error.message);
        }

        // Cleanup saat komponen di-destroy
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    });
</script>

<canvas height="120" bind:this={chartCanvas}></canvas>
