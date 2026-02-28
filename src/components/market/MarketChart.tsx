import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: { date: string; price: number }[];
}

export function MarketChart({ data }: Props) {
  return (
    <div className="retro-panel">
      <div className="title-bar">
        <span>📈 7-DAY PRICE CHART</span>
      </div>
      <div style={{ padding: 12, height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#4a4a6a"
              tick={{ fill: '#9999bb', fontSize: 9, fontFamily: 'var(--font-pixel)' }}
              tickFormatter={(v: string) => v.slice(5)}
            />
            <YAxis
              stroke="#4a4a6a"
              tick={{ fill: '#9999bb', fontSize: 9 }}
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: '#16213e',
                border: '1px solid #4a4a6a',
                fontFamily: 'var(--font-pixel)',
                fontSize: 9,
                color: '#ffd700',
              }}
              formatter={(value) => [`${Number(value).toFixed(1)}%`, 'YES']}
            />
            <Line
              type="stepAfter"
              dataKey="price"
              stroke="#ffd700"
              strokeWidth={2}
              dot={{ fill: '#ffd700', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
