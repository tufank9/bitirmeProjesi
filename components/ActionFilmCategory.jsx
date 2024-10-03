import {Ghost} from 'lucide-react'
import { AksiyonFİlmBaslik } from '@/app/category/action/text'

export function AksiyonFilm() {
  return (
    (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <Ghost className="mr-2 h-8 w-8" />
       <AksiyonFİlmBaslik/>
      </h1>
    </div>
    )
  );
}