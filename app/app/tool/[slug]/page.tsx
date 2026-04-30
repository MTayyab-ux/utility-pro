export default function ToolPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold capitalize">
        {slug.replace('-', ' ')}
      </h1>
      <p className="mt-4 text-gray-500">
        Bhai, ye aapka {slug} wala tool hai jo dynamic routing se chal raha hai!
      </p>
      {/* Yahan hum baad mein logic add karenge ke agar slug 'bmi' hai toh BMI ka component dikhao */}
    </div>
  );
}