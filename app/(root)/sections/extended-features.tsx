import { buttonVariants } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ExtendedFeatures = () => {
  return (
    <div className='space-y-32'>
      <div className='grid md:grid-cols-2 h-full gap-32'>
        <div className='hidden md:grid grid-cols-2 grid-rows-2 gap-4 h-[600px]'>
          <div className='row-span-2 relative'>
            <Image
              className='absolute inset-0 w-full h-full object-cover rounded-xl'
              src='/assets/ai/knight.jpg'
              alt="Imagine a character with the essence of a medieval monster hunter, now walking through the bustling streets of a neon-drenched, futuristic city. This character, inspired by the archetype of a seasoned warrior, is dressed in futuristic armor that combines elements of traditional combat readiness with high-tech flair. The armor is sleek, with LED lighting tracing its contours, providing an aura of otherworldly energy. The character carries advanced weaponry that echoes the design of medieval swords, but with a cybernetic twist, featuring glowing edges and intricate circuitry patterns. Their appearance is further enhanced with cybernetic enhancements visible around the eyes, giving them an enhanced, almost supernatural gaze that pierces through the neon glow of the city. The character's hair is styled to blend seamlessly into this world, with a modern yet timeless look that bridges their origins with their current surroundings. The backdrop is a vibrant cyberpunk city, alive with the hum of advanced technology and the glow of neon signs. Skyscrapers tower above, adorned with holographic displays and surrounded by flying vehicles. The atmosphere is thick with the promise of futuristic adventures and challenges, setting the stage for this character's journey through a world where technology and traditional heroism intertwine. The focus is on the seamless integration of a traditionally medieval character into the cyberpunk setting, highlighting their adaptation and the blending of genres to create a visually compelling narrative."
              fill
            />
          </div>
          <div className='relative'>
            <Image
              className='absolute inset-0 w-full h-full object-cover rounded-xl'
              src='/assets/ai/nike.jpg'
              alt="Imagine a highly detailed and meticulously crafted Nike Jordan sneaker, constructed entirely out of LEGO bricks, standing proudly as a testament to both sneaker culture and LEGO creativity. This LEGO masterpiece captures the iconic silhouette of the Jordan, featuring its classic high-top design. The LEGO bricks used range in colors to perfectly match the original sneaker's color scheme, with the primary palette being vivid reds, stark blacks, and pristine whites, mirroring a popular Jordan colorway. The sneaker's texture is cleverly replicated using LEGO pieces of various sizes, showcasing the sneaker's famous leather panels, the lace locks, and the unique perforations for breathability. Special attention is paid to the iconic 'Jumpman' logo, recreated with an intricate arrangement of smaller LEGO pieces in a contrasting color to stand out against the shoe's backdrop. The shoe rests on a sleek, flat surface, resembling a display stand, highlighting its status as a collectible piece. The background is intentionally blurred to ensure the focus remains on the LEGO Jordan's intricate details, from the tread pattern on the sole to the realistic curvature of the toe box, demonstrating an innovative blend of sneaker culture and LEGO craftsmanship."
              fill
            />
          </div>
          <div className='relative'>
            <Image
              className='absolute inset-0 w-full h-full object-cover rounded-xl'
              src='/assets/ai/btc.jpg'
              alt={`Envision a majestic figure standing at the heart of a sprawling digital cosmos, embodying the transformative power and sovereignty of Bitcoin. This character, named "Bit," transcends mere human form, presenting as a deity of the digital age, a god of decentralized finance and technological innovation. "Bit" is draped in garments that shimmer with an otherworldly glow, blending ethereal elegance with the aesthetic of cutting-edge technology. The fabric of their attire seems to be woven from the very essence of digital data, adorned with motifs of circuitry and binary code, glowing with the luster of liquid gold. Dominating "Bit's" divine appearance is a magnificent golden chain, each link forged from the symbolic representation of blockchain blocks. This chain wraps around their form, not merely as adornment but as a profound emblem of blockchain's indomitable strength and connectivity. It radiates a brilliant light, casting patterns that resemble the interconnected network of a blockchain, signifying the unbreakable bond and transparency that the technology represents. "Bit" holds their hands aloft, from which emanates an aura of golden light, illuminating the cyberspace around them. In this light, visions of digital transactions and cryptographic sequences dance, symbolizing the seamless and secure exchange of information and value that Bitcoin enables. Their gaze is wise and penetrating, reflecting a deep understanding of both the potential and challenges of the digital age. The realm around "Bit" is a spectacular vista of cyberspace, where the physical and digital merge in harmony. Binary rain falls softly, blending into the ether, while digital landscapes stretch out into infinity, representing the boundless possibilities of the blockchain. Above all, "Bit" stands as a guardian and guide, a deity whose domain is the ever-expanding universe of digital finance, offering a vision of a future where freedom, equality, and security reign supreme in the world of decentralized currency`}
              fill
            />
          </div>
        </div>
        <div className='text-left space-y-12'>
          <h2 className='text-5xl font-extrabold'>
            Generating Images with Stable Diffusion
          </h2>
          <div className='md:hidden grid grid-cols-2 grid-rows-2 gap-4 h-[450px]'>
            <div className='row-span-2 relative'>
              <Image
                className='absolute inset-0 w-full h-full object-cover rounded-xl'
                src='/assets/ai/knight.jpg'
                alt="Imagine a character with the essence of a medieval monster hunter, now walking through the bustling streets of a neon-drenched, futuristic city. This character, inspired by the archetype of a seasoned warrior, is dressed in futuristic armor that combines elements of traditional combat readiness with high-tech flair. The armor is sleek, with LED lighting tracing its contours, providing an aura of otherworldly energy. The character carries advanced weaponry that echoes the design of medieval swords, but with a cybernetic twist, featuring glowing edges and intricate circuitry patterns. Their appearance is further enhanced with cybernetic enhancements visible around the eyes, giving them an enhanced, almost supernatural gaze that pierces through the neon glow of the city. The character's hair is styled to blend seamlessly into this world, with a modern yet timeless look that bridges their origins with their current surroundings. The backdrop is a vibrant cyberpunk city, alive with the hum of advanced technology and the glow of neon signs. Skyscrapers tower above, adorned with holographic displays and surrounded by flying vehicles. The atmosphere is thick with the promise of futuristic adventures and challenges, setting the stage for this character's journey through a world where technology and traditional heroism intertwine. The focus is on the seamless integration of a traditionally medieval character into the cyberpunk setting, highlighting their adaptation and the blending of genres to create a visually compelling narrative."
                fill
              />
            </div>
            <div className='relative'>
              <Image
                className='absolute inset-0 w-full h-full object-cover rounded-xl'
                src='/assets/ai/nike.jpg'
                alt="Imagine a highly detailed and meticulously crafted Nike Jordan sneaker, constructed entirely out of LEGO bricks, standing proudly as a testament to both sneaker culture and LEGO creativity. This LEGO masterpiece captures the iconic silhouette of the Jordan, featuring its classic high-top design. The LEGO bricks used range in colors to perfectly match the original sneaker's color scheme, with the primary palette being vivid reds, stark blacks, and pristine whites, mirroring a popular Jordan colorway. The sneaker's texture is cleverly replicated using LEGO pieces of various sizes, showcasing the sneaker's famous leather panels, the lace locks, and the unique perforations for breathability. Special attention is paid to the iconic 'Jumpman' logo, recreated with an intricate arrangement of smaller LEGO pieces in a contrasting color to stand out against the shoe's backdrop. The shoe rests on a sleek, flat surface, resembling a display stand, highlighting its status as a collectible piece. The background is intentionally blurred to ensure the focus remains on the LEGO Jordan's intricate details, from the tread pattern on the sole to the realistic curvature of the toe box, demonstrating an innovative blend of sneaker culture and LEGO craftsmanship."
                fill
              />
            </div>
            <div className='relative'>
              <Image
                className='absolute inset-0 w-full h-full object-cover rounded-xl'
                src='/assets/ai/btc.jpg'
                alt={`Envision a majestic figure standing at the heart of a sprawling digital cosmos, embodying the transformative power and sovereignty of Bitcoin. This character, named "Bit," transcends mere human form, presenting as a deity of the digital age, a god of decentralized finance and technological innovation. "Bit" is draped in garments that shimmer with an otherworldly glow, blending ethereal elegance with the aesthetic of cutting-edge technology. The fabric of their attire seems to be woven from the very essence of digital data, adorned with motifs of circuitry and binary code, glowing with the luster of liquid gold. Dominating "Bit's" divine appearance is a magnificent golden chain, each link forged from the symbolic representation of blockchain blocks. This chain wraps around their form, not merely as adornment but as a profound emblem of blockchain's indomitable strength and connectivity. It radiates a brilliant light, casting patterns that resemble the interconnected network of a blockchain, signifying the unbreakable bond and transparency that the technology represents. "Bit" holds their hands aloft, from which emanates an aura of golden light, illuminating the cyberspace around them. In this light, visions of digital transactions and cryptographic sequences dance, symbolizing the seamless and secure exchange of information and value that Bitcoin enables. Their gaze is wise and penetrating, reflecting a deep understanding of both the potential and challenges of the digital age. The realm around "Bit" is a spectacular vista of cyberspace, where the physical and digital merge in harmony. Binary rain falls softly, blending into the ether, while digital landscapes stretch out into infinity, representing the boundless possibilities of the blockchain. Above all, "Bit" stands as a guardian and guide, a deity whose domain is the ever-expanding universe of digital finance, offering a vision of a future where freedom, equality, and security reign supreme in the world of decentralized currency`}
                fill
              />
            </div>
          </div>
          <p className=''>
            Enter a world where your words paint pictures. From
            abstract concepts to detailed scenes, our AI brings your
            vision to life with stunning accuracy and creativity.
          </p>
          <ul className='space-y-4'>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 mr-3 text-accent' />
              High-quality image generation from text descriptions.
            </li>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 mr-3 text-accent' />
              Ideal for creative projects, marketing materials, and
              content creation.
            </li>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 mr-3 text-accent' />
              User-friendly interface with customizable options.
            </li>
          </ul>
          <Link
            href='/app/images/generate'
            className={buttonVariants({
              variant: 'secondary',
              size: 'lg',
            })}
          >
            Create your own
          </Link>
        </div>
      </div>
      {/* Custom models */}
      <div className='grid md:grid-cols-2 h-full gap-32'>
        <div className='text-left space-y-12'>
          <h2 className='text-5xl font-extrabold'>
            Custom LLM Model for Your Use Case
          </h2>
          <div className='md:hidden h-[450px]'>
            <Image
              className='w-full h-full object-cover rounded-xl'
              src='/assets/ai/custom-model.jpg'
              alt='AI custom model'
              width={450}
              height={450}
            />
          </div>
          <p className=''>
            Don&apos;t just use AI—shape it to fit your vision. Our
            customizable Language Learning Models offer unparalleled
            flexibility and power for any application.
          </p>
          <ul className='space-y-4'>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 mr-3 text-accent' />
              Customize models for specialized tasks.
            </li>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 mr-3 text-accent' />
              Integrates with existing systems and workflows.
            </li>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 mr-3 text-accent' />
              Scalable solutions for businesses, academia, and
              development.
            </li>
          </ul>
          <Link
            href='/app/chat'
            className={buttonVariants({
              variant: 'secondary',
              size: 'lg',
            })}
          >
            Get started
          </Link>
        </div>
        <div className='hidden md:block h-[600px]'>
          <Image
            className='w-full h-full object-cover rounded-xl'
            src='/assets/ai/custom-model.jpg'
            alt='AI custom model'
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  )
}

export default ExtendedFeatures
