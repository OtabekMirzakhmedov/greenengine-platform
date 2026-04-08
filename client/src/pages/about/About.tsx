import PageHero from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import educationImage from "@assets/stock_images/diverse_students_col_38e99c13.jpg";
import partnershipImage from "@assets/stock_images/international_cooper_561d4ff8.jpg";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="About GREENENGINE"
        description="Promoting Creative Engineering Education for a Sustainable Green World"
      />

      <div className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <div className="relative h-[400px] rounded-md overflow-hidden shadow-lg mb-8">
                <img
                  src={educationImage}
                  alt="Engineering students collaborating on sustainable projects"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-semibold mb-6 text-foreground">About the Project</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                GREENENGINE (Promoting Creative Engineering Education for a Sustainable Green World) is an international project funded by the Erasmus+ Capacity Building in Higher Education (CBHE) program of the European Commission. The project brings together universities, research institutions, and innovation organizations from Europe and Uzbekistan to modernize engineering education and promote sustainable development.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The project focuses on integrating green technologies, environmental sustainability principles, and innovative teaching methodologies into engineering programs at partner universities. Through international collaboration, GREENENGINE aims to strengthen the capacity of higher education institutions to prepare future engineers who can address global environmental challenges and contribute to sustainable technological development.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The project consortium consists of 11 partner organizations from Uzbekistan, Italy, Turkey, and Georgia, combining European experience in sustainable engineering education with regional expertise in technological development and higher education reform.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">Project Focus Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Modern Curricula</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Development of modern curricula integrating green technologies, renewable energy, and environmental management into engineering programs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Innovative Teaching</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Creation of innovative teaching materials and methodologies that prepare engineers for the transition toward a green economy.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">University-Industry Links</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Establishment of stronger links between universities, industry, and research organizations to meet modern labor market needs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Knowledge Exchange</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Fostering interdisciplinary cooperation and knowledge exchange among partner institutions across Europe and Uzbekistan.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12 not-prose">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">Key Impact Areas</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground text-lg m-0 p-0">Green Technologies Integration</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-9">
                    Embedding sustainable technologies and environmental principles into engineering education across partner institutions.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground text-lg m-0 p-0">Capacity Building</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-9">
                    Strengthening professional competencies of academic staff through international training and knowledge exchange with European partners.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground text-lg m-0 p-0">Sustainable Innovation</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-9">
                    Encouraging research and innovation activities focused on sustainable technological development and environmentally friendly engineering solutions.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground text-lg m-0 p-0">Future-Ready Engineers</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-9">
                    Building a new generation of engineers equipped with skills required for the transition toward a green and sustainable economy.
                  </p>
                </div>
              </div>
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
                GREENENGINE is funded by the Erasmus+ Capacity Building in Higher Education (CBHE) program of the European Commission, which supports modernization and reform of higher education institutions in partner countries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This funding enables us to create meaningful partnerships between European and Uzbek institutions, develop innovative educational resources, and contribute to the advancement of sustainable engineering education that addresses global environmental challenges.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
