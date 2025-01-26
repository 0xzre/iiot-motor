import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Motor History Panel
          </h1>
        </div>
        <Card className="col-span-1 sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Performance Hisotry Monitor</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
