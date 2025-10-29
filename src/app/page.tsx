import FileUpload from './components/FileUpload';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center gap-8 mt-[-150px]">
        <h1 className="text-4xl font-bold">Seats statistics app</h1>

        <div className="mt-8">
          <FileUpload />
        </div>
      </main>
    </div>
  );
}
