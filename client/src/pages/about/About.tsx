import PageHero from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import educationImage from "@assets/stock_images/diverse_students_col_38e99c13.jpg";
import partnershipImage from "@assets/stock_images/international_cooper_561d4ff8.jpg";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="About GREENENGINE"
        description="International Educational Initiative for Sustainable Development"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <div className="relative h-[400px] rounded-md overflow-hidden shadow-lg mb-8">
                <img
                  src={educationImage}
                  alt="Diverse students collaborating on educational projects"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-semibold mb-6 text-foreground">Project Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                GREENENGINE is an ambitious international educational project designed to strengthen intercultural competence and promote sustainable development practices across higher education institutions in Central Asia, Georgia, and Europe.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through collaborative partnerships, innovative teaching methodologies, and the development of comprehensive educational resources, GREENENGINE aims to create a lasting impact on students, educators, and communities by fostering global citizenship and environmental awareness.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">Project Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Intercultural Passport</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A comprehensive framework including the IACD MOOC and Digital Storytelling components that equip students with essential intercultural competencies.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Community Development</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Strategic plans and initiatives designed to support local communities through educational innovation and sustainable practices.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Institutional Collaboration</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Partnerships across 11 institutions spanning Central Asia, Georgia, and Europe, fostering knowledge exchange and best practices.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Action</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Detailed implementation strategies ensuring sustainable impact and measurable outcomes across all project activities.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">Key Impact Areas</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Intercultural Competence Development</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Enhancing students' ability to navigate diverse cultural contexts and collaborate effectively across borders.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Sustainable Development Education</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Integrating sustainability principles into curriculum and institutional practices across partner organizations.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Digital Innovation</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Leveraging digital storytelling and online learning platforms to create accessible, engaging educational experiences.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Institutional Capacity Building</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Strengthening organizational capabilities through knowledge transfer, training programs, and resource development.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <div className="relative h-[400px] rounded-md overflow-hidden shadow-lg mb-8">
                <img
                  src={partnershipImage}
                  alt="International cooperation and global partnerships"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-semibold mb-6 text-foreground">EU Erasmus+ Programme</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                GREENENGINE is proudly co-funded by the European Union's Erasmus+ Programme, which supports education, training, youth, and sport initiatives across Europe and beyond.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This funding enables us to create meaningful partnerships, develop innovative educational resources, and contribute to the global advancement of intercultural understanding and sustainable development in higher education.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
